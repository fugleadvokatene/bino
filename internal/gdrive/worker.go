package gdrive

import (
	"context"
	"fmt"
	"log"
	"strings"
	"sync"
	"time"

	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/model"
	"google.golang.org/api/drive/v3"
)

const (
	maxNConcurrentGDriveTaskRequests = 100
	nWorkers                         = 1
	timeFormatDriveQ                 = "2006-01-02T15:04:05"
)

type Worker struct {
	cfg Config
	g   *Client

	in chan TaskRequest

	cachedInfo   *ConfigInfo
	cachedInfoMu *sync.Mutex
}

type TaskRequest struct {
	Response chan TaskResponse
	Type     model.GDriveTaskRequestID
	Payload  any
}

func (gdtr TaskRequest) String() string {
	return fmt.Sprintf("<GDriveTaskRequest of type %s>", gdtr.Type)
}

func newGDriveTaskRequest() TaskRequest {
	return TaskRequest{
		Response: make(chan TaskResponse, 1),
	}
}

func newGDriveTaskRequestGetFile(id string) TaskRequest {
	req := newGDriveTaskRequest()
	req.Type = model.GDriveTaskRequestIDGetFile
	req.Payload = id
	return req
}

type payloadInviteUser struct {
	ID    string
	Email string
	Role  string
}

func newGDriveTaskRequestInviteUser(id, email, role string) TaskRequest {
	req := newGDriveTaskRequest()
	req.Type = model.GDriveTaskRequestIDInviteUser
	req.Payload = payloadInviteUser{
		ID:    id,
		Email: email,
		Role:  role,
	}
	return req
}

type payloadUpdateDocument struct {
	ID      string
	Updates []JournalUpdate
}

func newGDriveTaskRequestUpdateJournal(id string, updates []JournalUpdate) TaskRequest {
	req := newGDriveTaskRequest()
	req.Type = model.GDriveTaskRequestIDUpdateJournal
	req.Payload = payloadUpdateDocument{
		ID:      id,
		Updates: updates,
	}
	return req
}

type ListFilesParams struct {
	Parent         string
	ModifiedAfter  time.Time
	ModifiedBefore time.Time
	PageToken      string
}

type ListFilesResult struct {
	Folder        Item
	Files         []Item
	NextPageToken string
}

func newGDriveTaskRequestListFiles(params ListFilesParams) TaskRequest {
	req := newGDriveTaskRequest()
	req.Type = model.GDriveTaskRequestIDListFiles
	req.Payload = params
	return req
}

func newGDriveTaskRequestCreateJournal(vars TemplateVars) TaskRequest {
	req := newGDriveTaskRequest()
	req.Type = model.GDriveTaskRequestIDCreateJournal
	req.Payload = vars
	return req
}

func (req TaskRequest) decodeGetFile() (string, error) {
	id, ok := req.Payload.(string)
	if !ok {
		return "", fmt.Errorf("decodeGetFile called on request with payload of type %T", req.Payload)
	}
	return id, nil
}

func (req TaskRequest) decodeInviteUser() (payloadInviteUser, error) {
	inv, ok := req.Payload.(payloadInviteUser)
	if !ok {
		return payloadInviteUser{}, fmt.Errorf("decodeInviteUser called on request with payload of type %T", req.Payload)
	}
	return inv, nil
}

func (req TaskRequest) decodeCreateJournal() (TemplateVars, error) {
	vars, ok := req.Payload.(TemplateVars)
	if !ok {
		return TemplateVars{}, fmt.Errorf("decodeCreateJournal called on request with payload of type %T", req.Payload)
	}
	return vars, nil
}

func (req TaskRequest) decodeUpdateJournal() (payloadUpdateDocument, error) {
	updates, ok := req.Payload.(payloadUpdateDocument)
	if !ok {
		return payloadUpdateDocument{}, fmt.Errorf("decodeUpdateJournal ")
	}
	return updates, nil
}

func (req TaskRequest) decodeListFiles() (ListFilesParams, error) {
	payload, ok := req.Payload.(ListFilesParams)
	if !ok {
		return ListFilesParams{}, fmt.Errorf("decodeListFiles called on request with payload of type %T", req.Payload)
	}
	return payload, nil
}

func (resp TaskResponse) decodeError() error {
	if resp.Error != nil {
		return resp.Error
	}
	return nil
}

func (resp TaskResponse) decodeGetFile() (Item, error) {
	if err := resp.decodeError(); err != nil {
		return Item{}, err
	}
	if resp.Type != model.GDriveTaskRequestIDGetFile {
		return Item{}, fmt.Errorf("decodeGetFile called on response of type %s", resp.Type.String())
	}
	item, ok := resp.Payload.(Item)
	if !ok {
		return Item{}, fmt.Errorf("decodeGetFile called with bad payload type %T", resp.Payload)
	}
	return item, nil
}

func (resp TaskResponse) decodeInviteUser() error {
	if err := resp.decodeError(); err != nil {
		return err
	}
	if resp.Type != model.GDriveTaskRequestIDInviteUser {
		return fmt.Errorf("decodeInviteUser called on response of type %s", resp.Type.String())
	}
	return nil
}

func (resp TaskResponse) decodeAppendUpdates() error {
	if err := resp.decodeError(); err != nil {
		return err
	}
	if resp.Type != model.GDriveTaskRequestIDUpdateJournal {
		return fmt.Errorf("decodeAppendUpdates called on response of type %s", resp.Type.String())
	}
	return nil
}

func (resp TaskResponse) decodeCreateJournal() (Item, error) {
	if err := resp.decodeError(); err != nil {
		return Item{}, err
	}
	if resp.Type != model.GDriveTaskRequestIDCreateJournal {
		return Item{}, fmt.Errorf("decodeCreateJournal called on response of type %s", resp.Type.String())
	}
	item, ok := resp.Payload.(Item)
	if !ok {
		return Item{}, fmt.Errorf("decodeCreateJournal called with bad payload type %T", resp.Payload)
	}
	return item, nil
}

func (resp TaskResponse) decodeListFiles() (ListFilesResult, error) {
	if err := resp.decodeError(); err != nil {
		return ListFilesResult{}, err
	}
	if resp.Type != model.GDriveTaskRequestIDListFiles {
		return ListFilesResult{}, fmt.Errorf("decodeListFiles called on response of type %s", resp.Type.String())
	}
	result, ok := resp.Payload.(ListFilesResult)
	if !ok {
		return ListFilesResult{}, fmt.Errorf("decodeListFiles called with bad payload type %T", resp.Payload)
	}
	return result, nil
}

type TaskResponse struct {
	Type    model.GDriveTaskRequestID
	Error   error
	Payload any
}

func (gdtr TaskResponse) String() string {
	return fmt.Sprintf("<GDriveTaskResponse of type %s>", gdtr.Type)
}

func NewWorker(ctx context.Context, cfg Config, g *Client) *Worker {
	w := &Worker{
		cfg:          cfg,
		g:            g,
		in:           make(chan TaskRequest, maxNConcurrentGDriveTaskRequests),
		cachedInfoMu: &sync.Mutex{},
	}

	// Warm the cache on gdrive info, then start pollin
	go func() {
		_ = w.GetGDriveConfigInfo()

		w.searchIndexWorker(ctx)
	}()

	// Workers
	for i := range nWorkers {
		go w.worker(i)
	}

	return w
}

func (w *Worker) GetGDriveConfigInfo() ConfigInfo {
	w.cachedInfoMu.Lock()
	defer w.cachedInfoMu.Unlock()
	if w.cachedInfo == nil {
		w.cachedInfo = new(ConfigInfo)
		item, err := w.g.GetFile(w.cfg.JournalFolder)
		if err != nil {
			panic(err)
		}
		w.cachedInfo.JournalFolder = item

		doc, err := w.g.ExportDocument(w.cfg.TemplateFile)
		if err != nil {
			panic(err)
		}
		w.cachedInfo.TemplateDoc = doc

		if err := doc.Validate(); err != nil {
			panic(err)
		}

		for _, id := range w.cfg.ExtraJournalFolders {
			folder, err := w.g.GetFile(id)
			if err != nil {
				log.Printf("error getting extra folder %s: %v", id, err)
				continue
			}
			w.cachedInfo.ExtraFolders = append(
				w.cachedInfo.ExtraFolders,
				folder,
			)
		}

		log.Printf("Fetched GDrive Config info")
	}
	return *w.cachedInfo
}

func (w *Worker) Exec(req TaskRequest) TaskResponse {
	w.in <- req
	return <-req.Response
}

func (w *Worker) GetFile(id string) (Item, error) {
	return w.Exec(newGDriveTaskRequestGetFile(id)).decodeGetFile()
}

func (w *Worker) InviteUser(id, email, role string) error {
	return w.Exec(newGDriveTaskRequestInviteUser(id, email, role)).decodeInviteUser()
}

func (w *Worker) CreateJournal(vars TemplateVars) (Item, error) {
	return w.Exec(newGDriveTaskRequestCreateJournal(vars)).decodeCreateJournal()
}

func (w *Worker) ListFiles(params ListFilesParams) (ListFilesResult, error) {
	return w.Exec(newGDriveTaskRequestListFiles(params)).decodeListFiles()
}

func (w *Worker) AppendUpdates(id string, updates []JournalUpdate) error {
	return w.Exec(newGDriveTaskRequestUpdateJournal(id, updates)).decodeAppendUpdates()
}

func (w *Worker) worker(workerID int) {
	for {
		req := <-w.in
		resp := w.handleRequest(req)
		req.Response <- resp
	}
}

func (w *Worker) handleRequest(req TaskRequest) (resp TaskResponse) {
	defer func() {
		if r := recover(); r != nil {
			resp = w.errorResponse(req, fmt.Errorf("panicked in handler: %v", r))
		}
	}()

	switch req.Type {
	case model.GDriveTaskRequestIDGetFile:
		return w.handleRequestGetFile(req)
	case model.GDriveTaskRequestIDInviteUser:
		return w.handleRequestInviteUser(req)
	case model.GDriveTaskRequestIDCreateJournal:
		return w.handleRequestCreateJournal(req)
	case model.GDriveTaskRequestIDListFiles:
		return w.handleRequestListFiles(req)
	case model.GDriveTaskRequestIDUpdateJournal:
		return w.handleRequestUpdateJournal(req)
	}
	return w.errorResponse(req, fmt.Errorf("unknown request type"))
}

func (w *Worker) handleRequestGetFile(req TaskRequest) TaskResponse {
	id, err := req.decodeGetFile()
	if err != nil {
		return w.errorResponse(req, err)
	}

	item, err := w.g.GetFile(id)
	if err != nil {
		return w.errorResponse(req, err)
	}

	return w.successResponse(req, item)
}

func (w *Worker) handleRequestInviteUser(req TaskRequest) TaskResponse {
	payload, err := req.decodeInviteUser()
	if err != nil {
		return w.errorResponse(req, err)
	}

	call := w.g.Drive.Permissions.Create(payload.ID, &drive.Permission{
		Type:         "user",
		EmailAddress: payload.Email,
		Role:         payload.Role,
	}).SendNotificationEmail(true)

	if w.g.DriveBase != "" {
		call = call.
			SupportsAllDrives(true)
	}

	_, err = call.Do()
	if err != nil {
		return w.errorResponse(req, err)
	}

	return w.successResponse(req, nil)
}

func (w *Worker) handleRequestCreateJournal(req TaskRequest) TaskResponse {
	vars, err := req.decodeCreateJournal()
	if err != nil {
		return w.errorResponse(req, err)
	}
	info := w.GetGDriveConfigInfo()
	item, err := w.g.CreateDocument(info, vars)
	if err != nil {
		return w.errorResponse(req, err)
	}
	return w.successResponse(req, item)
}

func (w *Worker) handleRequestUpdateJournal(req TaskRequest) TaskResponse {
	updates, err := req.decodeUpdateJournal()
	if err != nil {
		return w.errorResponse(req, err)
	}
	if err := w.g.AppendUpdates(updates.ID, updates.Updates); err != nil {
		return w.errorResponse(req, err)
	}
	return w.successResponse(req, nil)
}

func (w *Worker) handleRequestListFiles(req TaskRequest) TaskResponse {
	params, err := req.decodeListFiles()
	if err != nil {
		return w.errorResponse(req, err)
	}

	folderItem, err := w.g.GetFile(params.Parent)
	if err != nil {
		return w.errorResponse(req, err)
	}

	call := w.g.Drive.Files.List()

	if w.g.DriveBase != "" {
		call = call.
			SupportsAllDrives(true)
		call = call.DriveId(w.cfg.DriveBase)
		call = call.IncludeItemsFromAllDrives(true)
		call = call.Corpora("drive")
	}

	rules := []string{
		"mimeType = 'application/vnd.google-apps.document'",
		fmt.Sprintf("'%s' in parents", params.Parent),
	}

	if !params.ModifiedAfter.IsZero() {
		rules = append(rules, fmt.Sprintf("modifiedTime > '%s'", params.ModifiedAfter.Format(timeFormatDriveQ)))
	}
	if !params.ModifiedBefore.IsZero() {
		rules = append(rules, fmt.Sprintf("modifiedTime < '%s'", params.ModifiedBefore.Format(timeFormatDriveQ)))
	}

	q := strings.Join(rules, " and ")
	call = call.Q(q)

	if params.PageToken != "" {
		call = call.PageToken(params.PageToken)
	}

	call = call.OrderBy("modifiedTime desc")
	call = call.Fields("files(id, name, modifiedTime, createdTime, trashed), nextPageToken")

	fileList, err := call.Do()
	if err != nil {
		return w.errorResponse(req, err)
	}

	return TaskResponse{
		Type: model.GDriveTaskRequestIDListFiles,
		Payload: ListFilesResult{
			Folder: folderItem,
			Files: generic.SliceToSlice(fileList.Files, func(in *drive.File) Item {
				return GDriveItemFromFile(in, nil)
			}),
			NextPageToken: fileList.NextPageToken,
		},
		Error: nil,
	}
}

func (w *Worker) errorResponse(req TaskRequest, err error) TaskResponse {
	return TaskResponse{
		Type:    req.Type,
		Error:   err,
		Payload: nil,
	}
}

func (w *Worker) successResponse(req TaskRequest, obj any) TaskResponse {
	return TaskResponse{
		Type:    req.Type,
		Error:   nil,
		Payload: obj,
	}
}
