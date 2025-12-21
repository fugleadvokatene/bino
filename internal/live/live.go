package live

import (
	"context"
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
	// go broker.DebugTimer()

	return broker
}

func (b *Broker) Connect(client *ClientConnection) {
	b.connect <- client
}

func (b *Broker) Disconnect(client *ClientConnection) {
	b.disconnect <- client
}

func (b *Broker) Publish(data Event) {
	b.rx <- data
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

func (b *Broker) DebugTimer() {
	for {
		time.Sleep(time.Second)
		b.Publish(Event{Type: model.LiveEventTypeHello, Data: []byte("timer")})
	}
}
