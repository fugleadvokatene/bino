package handlerlive

import (
	"fmt"
	"net/http"

	"github.com/fugleadvokatene/bino/internal/sse"
)

type stream struct {
	broker *sse.Broker
}

func (h *stream) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming not supported", http.StatusInternalServerError)
		return
	}

	// Set up client connection
	clientConnection := sse.NewClientConnection(ctx, h.broker)

	// Configure as SSE
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	for {
		select {
		case <-r.Context().Done():
			h.broker.Disconnect(clientConnection)
			return
		case event := <-clientConnection.RX:
			fmt.Fprintf(w, "event: %s\ndata: %s\n\n", event.Type, string(event.Data))

			flusher.Flush()
		}
	}
}
