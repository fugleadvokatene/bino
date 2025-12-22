package sse

import (
	"context"
	"log/slog"

	"github.com/fugleadvokatene/bino/internal/request"
)

type ClientConnection struct {
	user user
	RX   chan Event
}

func NewClientConnection(ctx context.Context, broker *Broker) *ClientConnection {
	rx := make(chan Event)

	cd := request.MustLoadCommonData(ctx)
	client := &ClientConnection{
		RX: rx,
		user: user{
			id:             cd.User.AppuserID,
			loggingConsent: cd.User.LoggingConsent,
		},
	}
	broker.Connect(client)
	context.AfterFunc(ctx, func() {
		broker.Disconnect(client)
		close(rx)
	})
	return client
}

type user struct {
	id             int32
	loggingConsent bool
}

func (cc *ClientConnection) Log(ctx context.Context, lv slog.Level, msg string, args ...any) {
	if !cc.user.loggingConsent {
		return
	}
	slog.Log(ctx, lv, msg, args...)
}
