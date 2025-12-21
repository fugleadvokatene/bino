package handlerlive

import (
	"net/http"

	"github.com/fugleadvokatene/bino/internal/live"
)

type stream struct {
	broker *live.Broker
}

func (h *stream) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming not supported", http.StatusInternalServerError)
		return
	}

	// Set up client connection
	clientConnection := live.NewClientConnection(ctx, h.broker)
	defer func() {
	}()

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
			w.Write([]byte("event: "))
			w.Write([]byte(event.Type))
			w.Write([]byte("\ndata: "))
			w.Write(event.Data)
			w.Write([]byte("\n\n"))

			flusher.Flush()
		}
	}
}
