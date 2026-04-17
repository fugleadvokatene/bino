package gdrive

import (
	"context"
	"errors"
	"fmt"
	"log"
	"log/slog"
	"runtime/debug"
	"strings"
	"sync"
	"time"

	"github.com/fugleadvokatene/bino/internal/background"
	"github.com/fugleadvokatene/bino/internal/gdrive/document"
	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/model"
	"google.golang.org/api/docs/v1"
	"google.golang.org/api/drive/v3"
)

const (
	maxNConcurrentGDriveTaskRequests = 100
	nWorkers                         = 4
	timeFormatDriveQ                 = "2006-01-02T15:04:05"
)

type Worker struct {
	cfg Config
	g   *Client
	bg  *background.Jobs

	indexerState IndexerState

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
	return fmt.Sprintf("GDriveTaskRequest(type=%s payload=%v)", gdtr.Type, gdtr.Payload)
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

func newGDriveTaskRequestGetDocument(id string) TaskRequest {
	req := newGDriveTaskRequest()
	req.Type = model.GDriveTaskRequestIDGetDocument
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

func newGDriveTaskRequestGetIndexerState() TaskRequest {
	req := newGDriveTaskRequest()
	req.Type = model.GDriveTaskRequestIDGetIndexerState
	return req
}

func newGDriveTaskRequestSetIndexerState(
	enable bool,
	maxCreatedPerRound int,
	minutesBetweenRounds int,
) TaskRequest {
	req := newGDriveTaskRequest()
	req.Type = model.GDriveTaskRequestIDSetIndexerState
	req.Payload = IndexerState{
		Enabled:                     enable,
		MaxDocumentsCreatedPerRound: maxCreatedPerRound,
		Interval:                    time.Minute * time.Duration(minutesBetweenRounds),
	}
	return req
}

type listFilesParams struct {
	Parent         string
	ModifiedAfter  time.Time
	ModifiedBefore time.Time
	PageToken      string
}

type listFilesResult struct {
	Folder        Item
	Files         []Item
	NextPageToken string
}

func newGDriveTaskRequestListFiles(params listFilesParams) TaskRequest {
	req := newGDriveTaskRequest()
	req.Type = model.GDriveTaskRequestIDListFiles
	req.Payload = params
	return req
}

type listChangesParams struct {
	PageToken string
}

type listChangesResult struct {
	NextPageToken string
}

func newGDriveTaskRequestListChanges(params listChangesParams) TaskRequest {
	req := newGDriveTaskRequest()
	req.Type = model.GDriveTaskRequestIDListChanges
	req.Payload = params
	return req
}

func newGDriveTaskRequestCreateJournal(home int32, vars TemplateVars) TaskRequest {
	req := newGDriveTaskRequest()
	req.Type = model.GDriveTaskRequestIDCreateJournal
	req.Payload = payloadCreatejournal{
		TemplateVars: vars,
		Home:         home,
	}
	return req
}

func newGDriveTaskRequestGetRawDocument(id string) TaskRequest {
	req := newGDriveTaskRequest()
	req.Type = model.GDriveTaskRequestIDGetRawDocument
	req.Payload = id
	return req
}

type payloadEditJournal struct {
	ID     string
	Edited *document.GDocsDocument
}

func newGDriveTaskRequestEditJournal(id string, edited *document.GDocsDocument) TaskRequest {
	req := newGDriveTaskRequest()
	req.Type = model.GDriveTaskRequestIDEditJournal
	req.Payload = payloadEditJournal{ID: id, Edited: edited}
	return req
}

func (req TaskRequest) decodeEditJournal() (payloadEditJournal, error) {
	return decodeReq[payloadEditJournal](req)
}

func (resp TaskResponse) decodeEditJournal() error {
	return decodeEmptyResp(model.GDriveTaskRequestIDEditJournal, resp)
}

type payloadInsertTextAt struct {
	ID    string
	Index int64
	Text  string
}

func newGDriveTaskRequestInsertTextAt(id string, index int64, text string) TaskRequest {
	req := newGDriveTaskRequest()
	req.Type = model.GDriveTaskRequestIDInsertTextAt
	req.Payload = payloadInsertTextAt{
		ID:    id,
		Index: index,
		Text:  text,
	}
	return req
}

func decodeReq[T any](req TaskRequest) (T, error) {
	v, ok := req.Payload.(T)
	if !ok {
		return *new(T), fmt.Errorf("request with payload of type %T, expected %T", req.Payload, v)
	}
	return v, nil
}

func (req TaskRequest) decodeGetFile() (string, error) {
	return decodeReq[string](req)
}

func (req TaskRequest) decodeGetDocument() (string, error) {
	return decodeReq[string](req)
}

func (req TaskRequest) decodeInviteUser() (payloadInviteUser, error) {
	return decodeReq[payloadInviteUser](req)
}

type payloadCreatejournal struct {
	Home         int32
	TemplateVars TemplateVars
}

func (req TaskRequest) decodeCreateJournal() (payloadCreatejournal, error) {
	return decodeReq[payloadCreatejournal](req)
}

func (req TaskRequest) decodeUpdateJournal() (payloadUpdateDocument, error) {
	return decodeReq[payloadUpdateDocument](req)
}

func (req TaskRequest) decodeSetIndexerState() (IndexerState, error) {
	return decodeReq[IndexerState](req)
}

func (req TaskRequest) decodeListFiles() (listFilesParams, error) {
	return decodeReq[listFilesParams](req)
}

func (req TaskRequest) decodeGetRawDocument() (string, error) {
	return decodeReq[string](req)
}

func (req TaskRequest) decodeInsertTextAt() (payloadInsertTextAt, error) {
	return decodeReq[payloadInsertTextAt](req)
}

func (resp TaskResponse) decodeError() error {
	if resp.Error != nil {
		return resp.Error
	}
	return nil
}

func decodeResp[T any](reqID model.GDriveTaskRequestID, resp TaskResponse) (T, error) {
	if err := resp.decodeError(); err != nil {
		return *new(T), err
	}
	if resp.Type != reqID {
		return *new(T), fmt.Errorf("on response of type %s, expected %s", resp.Type.String(), reqID.String())
	}
	item, ok := resp.Payload.(T)
	if !ok {
		return *new(T), fmt.Errorf("decodeGetFile called with bad payload type %T expected %T", resp.Payload, item)
	}
	return item, nil
}

func decodeEmptyResp(reqID model.GDriveTaskRequestID, resp TaskResponse) error {
	if err := resp.decodeError(); err != nil {
		return err
	}
	if resp.Type != reqID {
		return fmt.Errorf("on response of type %s, expected %s", resp.Type.String(), reqID.String())
	}
	return nil
}

func (resp TaskResponse) decodeGetFile() (Item, error) {
	return decodeResp[Item](model.GDriveTaskRequestIDGetFile, resp)
}

func (resp TaskResponse) decodeGetDocument() (*docs.Document, error) {
	return decodeResp[*docs.Document](model.GDriveTaskRequestIDGetDocument, resp)
}

func (resp TaskResponse) decodeInviteUser() error {
	return decodeEmptyResp(model.GDriveTaskRequestIDInviteUser, resp)
}

func (resp TaskResponse) decodeAppendUpdates() error {
	return decodeEmptyResp(model.GDriveTaskRequestIDUpdateJournal, resp)
}

func (resp TaskResponse) decodeSetIndexerState() error {
	return decodeEmptyResp(model.GDriveTaskRequestIDSetIndexerState, resp)
}

func (resp TaskResponse) decodeGetIndexerState() (IndexerState, error) {
	return decodeResp[IndexerState](model.GDriveTaskRequestIDGetIndexerState, resp)
}

func (resp TaskResponse) decodeCreateJournal() (Item, error) {
	return decodeResp[Item](model.GDriveTaskRequestIDCreateJournal, resp)
}

func (resp TaskResponse) decodeListFiles() (listFilesResult, error) {
	return decodeResp[listFilesResult](model.GDriveTaskRequestIDListFiles, resp)
}

func (resp TaskResponse) decodeListChanges() (listChangesResult, error) {
	return decodeResp[listChangesResult](model.GDriveTaskRequestIDListChanges, resp)
}

func (resp TaskResponse) decodeGetRawDocument() (*docs.Document, error) {
	return decodeResp[*docs.Document](model.GDriveTaskRequestIDGetRawDocument, resp)
}

func (resp TaskResponse) decodeInsertTextAt() error {
	return decodeEmptyResp(model.GDriveTaskRequestIDInsertTextAt, resp)
}

type TaskResponse struct {
	Type    model.GDriveTaskRequestID
	Error   error
	Payload any
}

func (gdtr TaskResponse) String() string {
	return fmt.Sprintf("<GDriveTaskResponse of type %s>", gdtr.Type)
}

func NewWorker(ctx context.Context, cfg Config, g *Client, bg *background.Jobs) *Worker {
	w := &Worker{
		cfg:          cfg,
		g:            g,
		bg:           bg,
		in:           make(chan TaskRequest, maxNConcurrentGDriveTaskRequests),
		cachedInfoMu: &sync.Mutex{},
		indexerState: IndexerState{
			Enabled:                     true,
			MaxDocumentsCreatedPerRound: 20,
			Interval:                    10 * time.Minute,
		},
	}

	// Warm the cache on gdrive info, then start pollin
	go func() {
		_ = w.GetGDriveConfigInfo(ctx)

		w.searchIndexWorker(ctx)
	}()

	// Workers
	for i := range nWorkers {
		go w.worker(ctx, i)
	}

	return w
}

func validateTemplate(tpl *docs.Document) error {
	s := document.ExtractIndexableText(tpl)
	errs := []error{}
	for _, k := range model.TemplateValues() {
		if !strings.Contains(s, k.String()) {
			errs = append(errs, fmt.Errorf("template is missing variable '%s'", k))
		}
	}
	return errors.Join(errs...)
}

func (w *Worker) GetGDriveConfigInfo(ctx context.Context) ConfigInfo {
	w.cachedInfoMu.Lock()
	defer w.cachedInfoMu.Unlock()

	if w.cachedInfo == nil {
		divisions, err := w.g.DB.GetDivisions(ctx)
		if err != nil {
			panic(err)
		}

		w.cachedInfo = new(ConfigInfo)

		for _, div := range divisions {
			if div.JournalFolderID == "" {
				slog.WarnContext(ctx, "Division missing journal folder ID", "id", div.ID, "name", div.Name)
				continue
			}
			if div.TemplateJournalID == "" {
				slog.WarnContext(ctx, "Division missing template journal ID", "id", div.ID, "name", div.Name)
				continue
			}
			if div.JournalFolderName == "" {
				slog.WarnContext(ctx, "Division missing journal folder name", "id", div.ID, "name", div.Name)
				continue
			}
			if div.TemplateJournalName == "" {
				slog.WarnContext(ctx, "Division missing template journal name", "id", div.ID, "name", div.Name)
				continue
			}

			var divisionConfig DivisionConfig
			divisionConfig.DivisionID = div.ID

			folderItem, err := w.g.GetFile(div.JournalFolderID)
			if err != nil {
				panic(err)
			}
			divisionConfig.JournalFolder = folderItem

			fileItem, err := w.g.GetFile(div.TemplateJournalID)
			if err != nil {
				panic(err)
			}
			divisionConfig.TemplateItem = fileItem

			doc, err := w.g.GetDocument(div.TemplateJournalID)
			if err != nil {
				panic(err)
			}
			divisionConfig.TemplateDoc = doc

			if err := validateTemplate(doc); err != nil {
				panic(err)
			}

			w.cachedInfo.DivisionConfigs = append(w.cachedInfo.DivisionConfigs, divisionConfig)
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

func (w *Worker) GetDocument(id string) (*docs.Document, error) {
	return w.Exec(newGDriveTaskRequestGetDocument(id)).decodeGetDocument()
}

func (w *Worker) InviteUser(id, email, role string) error {
	return w.Exec(newGDriveTaskRequestInviteUser(id, email, role)).decodeInviteUser()
}

func (w *Worker) CreateJournal(home int32, vars TemplateVars) (Item, error) {
	return w.Exec(newGDriveTaskRequestCreateJournal(home, vars)).decodeCreateJournal()
}

func (w *Worker) ListFiles(params listFilesParams) (listFilesResult, error) {
	return w.Exec(newGDriveTaskRequestListFiles(params)).decodeListFiles()
}

func (w *Worker) ListChanges(params listChangesParams) (listChangesResult, error) {
	return w.Exec(newGDriveTaskRequestListChanges(params)).decodeListChanges()
}

func (w *Worker) AppendUpdates(id string, updates []JournalUpdate) error {
	return w.Exec(newGDriveTaskRequestUpdateJournal(id, updates)).decodeAppendUpdates()
}

func (w *Worker) GetIndexerState() (IndexerState, error) {
	return w.Exec(newGDriveTaskRequestGetIndexerState()).decodeGetIndexerState()
}

func (w *Worker) SetIndexerState(enable bool, maxCreatedPerRound int, minutesBetweenRounds int) error {
	return w.Exec(newGDriveTaskRequestSetIndexerState(enable, maxCreatedPerRound, minutesBetweenRounds)).decodeSetIndexerState()
}

func (w *Worker) GetRawDocument(id string) (*docs.Document, error) {
	return w.Exec(newGDriveTaskRequestGetRawDocument(id)).decodeGetRawDocument()
}

func (w *Worker) InsertTextAt(id string, index int64, text string) error {
	return w.Exec(newGDriveTaskRequestInsertTextAt(id, index, text)).decodeInsertTextAt()
}

func (w *Worker) EditJournal(id string, edited *document.GDocsDocument) error {
	return w.Exec(newGDriveTaskRequestEditJournal(id, edited)).decodeEditJournal()
}
func (w *Worker) worker(ctx context.Context, workerID int) {
	for {
		req := <-w.in
		resp := w.handleRequest(ctx, req)
		req.Response <- resp
	}
}

func (w *Worker) handleRequest(ctx context.Context, req TaskRequest) (resp TaskResponse) {
	defer func() {
		if r := recover(); r != nil {
			debug.PrintStack()
			resp = w.errorResponse(ctx, req, fmt.Errorf("panicked in handler: %v", r))
		}
	}()

	switch req.Type {
	case model.GDriveTaskRequestIDGetFile:
		return w.handleRequestGetFile(ctx, req)
	case model.GDriveTaskRequestIDGetDocument:
		return w.handleRequestGetDocument(ctx, req)
	case model.GDriveTaskRequestIDInviteUser:
		return w.handleRequestInviteUser(ctx, req)
	case model.GDriveTaskRequestIDCreateJournal:
		return w.handleRequestCreateJournal(ctx, req)
	case model.GDriveTaskRequestIDListFiles:
		return w.handleRequestListFiles(ctx, req)
	case model.GDriveTaskRequestIDListChanges:
		return w.handleRequestListChanges(ctx, req)
	case model.GDriveTaskRequestIDUpdateJournal:
		return w.handleRequestUpdateJournal(ctx, req)
	case model.GDriveTaskRequestIDGetIndexerState:
		return w.handleRequestGetIndexerState(ctx, req)
	case model.GDriveTaskRequestIDSetIndexerState:
		return w.handleRequestSetIndexerState(ctx, req)
	case model.GDriveTaskRequestIDGetRawDocument:
		return w.handleRequestGetRawDocument(ctx, req)
	case model.GDriveTaskRequestIDInsertTextAt:
		return w.handleRequestInsertTextAt(ctx, req)
	case model.GDriveTaskRequestIDEditJournal:
		return w.handleRequestEditJournal(ctx, req)
	}
	return w.errorResponse(ctx, req, fmt.Errorf("unknown request type"))
}

func (w *Worker) handleRequestGetFile(ctx context.Context, req TaskRequest) TaskResponse {
	id, err := req.decodeGetFile()
	if err != nil {
		return w.errorResponse(ctx, req, err)
	}

	item, err := w.g.GetFile(id)
	if err != nil {
		return w.errorResponse(ctx, req, err)
	}

	return w.successResponse(ctx, req, item)
}

func (w *Worker) handleRequestGetDocument(ctx context.Context, req TaskRequest) TaskResponse {
	id, err := req.decodeGetDocument()
	if err != nil {
		return w.errorResponse(ctx, req, err)
	}

	item, err := w.g.GetDocument(id)
	if err != nil {
		return w.errorResponse(ctx, req, err)
	}

	return w.successResponse(ctx, req, item)
}

func (w *Worker) handleRequestInviteUser(ctx context.Context, req TaskRequest) TaskResponse {
	payload, err := req.decodeInviteUser()
	if err != nil {
		return w.errorResponse(ctx, req, err)
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
		return w.errorResponse(ctx, req, err)
	}

	return w.successResponse(ctx, req, nil)
}

func (w *Worker) handleRequestCreateJournal(ctx context.Context, req TaskRequest) TaskResponse {
	payload, err := req.decodeCreateJournal()
	if err != nil {
		return w.errorResponse(ctx, req, err)
	}

	division, err := w.g.DB.Q.GetHomeDivision(ctx, payload.Home)
	if err != nil {
		return w.errorResponse(ctx, req, fmt.Errorf("getting home division: %w", err))
	}

	info := w.GetGDriveConfigInfo(ctx)

	var divisionConfig DivisionConfig
	var found bool
	for _, div := range info.DivisionConfigs {
		if div.DivisionID == division.Division {
			divisionConfig = div
			found = true
			break
		}
	}
	if !found {
		return w.errorResponse(ctx, req, fmt.Errorf("no division config found matching ID=%d (%s)", division.Division, division.Name.String))
	}

	item, err := w.g.CreateDocument(
		divisionConfig,
		payload.TemplateVars,
	)
	if err != nil {
		return w.errorResponse(ctx, req, err)
	}
	return w.successResponse(ctx, req, item)
}

func (w *Worker) handleRequestUpdateJournal(ctx context.Context, req TaskRequest) TaskResponse {
	updates, err := req.decodeUpdateJournal()
	if err != nil {
		return w.errorResponse(ctx, req, err)
	}
	if err := w.g.AppendUpdates(updates.ID, updates.Updates); err != nil {
		return w.errorResponse(ctx, req, err)
	}
	return w.successResponse(ctx, req, nil)
}

func (w *Worker) handleRequestGetIndexerState(ctx context.Context, req TaskRequest) TaskResponse {
	return w.successResponse(ctx, req, w.indexerState)
}

func (w *Worker) handleRequestSetIndexerState(ctx context.Context, req TaskRequest) TaskResponse {
	state, err := req.decodeSetIndexerState()
	if err != nil {
		return w.errorResponse(ctx, req, err)
	}
	w.indexerState = state
	slog.Info("Indexer state updated", "enabled", state.Enabled, "interval", state.Interval, "max documents created per round", state.MaxDocumentsCreatedPerRound)
	return w.successResponse(ctx, req, nil)
}

func (w *Worker) handleRequestListFiles(ctx context.Context, req TaskRequest) TaskResponse {
	params, err := req.decodeListFiles()
	if err != nil {
		return w.errorResponse(ctx, req, err)
	}

	folderItem, err := w.g.GetFile(params.Parent)
	if err != nil {
		return w.errorResponse(ctx, req, err)
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
		return w.errorResponse(ctx, req, err)
	}

	return TaskResponse{
		Type: model.GDriveTaskRequestIDListFiles,
		Payload: listFilesResult{
			Folder: folderItem,
			Files: generic.SliceToSlice(fileList.Files, func(in *drive.File) Item {
				return GDriveItemFromFile(in, nil)
			}),
			NextPageToken: fileList.NextPageToken,
		},
		Error: nil,
	}
}

func (w *Worker) handleRequestListChanges(ctx context.Context, req TaskRequest) TaskResponse {
	return w.errorResponse(ctx, req, fmt.Errorf("not implemented"))
}

func (w *Worker) handleRequestGetRawDocument(ctx context.Context, req TaskRequest) TaskResponse {
	id, err := req.decodeGetRawDocument()
	if err != nil {
		return w.errorResponse(ctx, req, err)
	}

	doc, err := w.g.GetRawDocument(id)
	if err != nil {
		return w.errorResponse(ctx, req, err)
	}

	return w.successResponse(ctx, req, doc)
}

func (w *Worker) handleRequestEditJournal(ctx context.Context, req TaskRequest) TaskResponse {
	payload, err := req.decodeEditJournal()
	if err != nil {
		return w.errorResponse(ctx, req, err)
	}
	if err := w.g.EditJournal(payload.ID, payload.Edited); err != nil {
		return w.errorResponse(ctx, req, err)
	}
	return w.successResponse(ctx, req, nil)
}

func (w *Worker) handleRequestInsertTextAt(ctx context.Context, req TaskRequest) TaskResponse {
	payload, err := req.decodeInsertTextAt()
	if err != nil {
		return w.errorResponse(ctx, req, err)
	}

	if err := w.g.InsertTextAt(payload.ID, payload.Index, payload.Text); err != nil {
		return w.errorResponse(ctx, req, err)
	}

	return w.successResponse(ctx, req, nil)
}
func (w *Worker) errorResponse(ctx context.Context, req TaskRequest, err error) TaskResponse {
	w.g.DB.SysLog(ctx, fmt.Sprintf("Error handling %s: %s", req.String(), err.Error()), model.SeverityError, time.Now())
	return TaskResponse{
		Type:    req.Type,
		Error:   err,
		Payload: nil,
	}
}

func (w *Worker) successResponse(ctx context.Context, req TaskRequest, obj any) TaskResponse {
	w.g.DB.SysLog(ctx, fmt.Sprintf("OK: %s", req.String()), model.SeverityInfo, time.Now())
	return TaskResponse{
		Type:    req.Type,
		Error:   nil,
		Payload: obj,
	}
}
