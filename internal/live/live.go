package live

import (
	"context"
	"encoding/json"
	"log/slog"
	"time"

	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/model"
)

type Broker struct {
	rx         chan Event
	connect    chan *ClientConnection
	disconnect chan *ClientConnection
	clients    generic.Set[*ClientConnection]
}

func NewBroker(ctx context.Context) *Broker {
	broker := &Broker{
		rx:         make(chan Event),
		connect:    make(chan *ClientConnection),
		disconnect: make(chan *ClientConnection),
		clients:    make(generic.Set[*ClientConnection]),
	}
	go broker.worker(ctx)

	// Enable for debug if needed
	// go broker.DebugTimer(ctx)

	return broker
}

func (b *Broker) Connect(client *ClientConnection) {
	b.connect <- client
}

func (b *Broker) Disconnect(client *ClientConnection) {
	b.disconnect <- client
}

func (b *Broker) JournalCreated(ctx context.Context, patientID int32, url string) {
	b.publish(ctx, model.LiveEventTypeJournalCreated, JournalCreated{
		PatientID:  patientID,
		JournalURL: url,
	})
}

func (b *Broker) publish(ctx context.Context, eventType model.LiveEventType, data any) {
	slog.DebugContext(ctx, "Publish", "eventType", eventType, "data", data)

	bdata, err := json.Marshal(data)
	if err != nil {
		slog.ErrorContext(ctx, "Couldn't encode event", "eventType", eventType, "data", data)
		return
	}

	b.rx <- Event{Type: eventType, Data: bdata}
}

func (b *Broker) worker(ctx context.Context) {
	for {
		b.doWithRecover(ctx)
	}
}

func (b *Broker) doWithRecover(ctx context.Context) {
	defer func() {
		if err := recover(); err != nil {
			slog.Log(ctx, slog.LevelError, "Panic in broker", "err", err)
		}
	}()

	select {
	case event := <-b.rx:
		n := len(b.clients)
		slog.DebugContext(ctx, "Broadcast", "event", event, "n", n)
		if n == 0 {
			return
		}
		for client := range b.clients {
			client.RX <- event
		}
	case client := <-b.connect:
		client.Log(ctx, slog.LevelDebug, "Connecting", "userid", client.user.id)
		b.clients.Add(client)
	case client := <-b.disconnect:
		client.Log(ctx, slog.LevelDebug, "Disconnecting", "userid", client.user.id)
		delete(b.clients, client)
	}
}

func (b *Broker) DebugTimer(ctx context.Context) {
	for {
		time.Sleep(time.Second)
		b.publish(ctx, model.LiveEventTypeHello, "timer")
	}
}
