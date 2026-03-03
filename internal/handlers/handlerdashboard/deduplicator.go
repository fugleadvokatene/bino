package handlerdashboard

import (
	"sync"
)

type deduplicator struct {
	mu    sync.Mutex
	waits map[string]chan struct{}
}

func newDeduplicator() *deduplicator {
	return &deduplicator{
		waits: make(map[string]chan struct{}),
	}
}

func (dd *deduplicator) dedup(key string) bool {
	dd.mu.Lock()
	waitCh, exists := dd.waits[key]
	if !exists {
		dd.waits[key] = make(chan struct{})
		dd.mu.Unlock()
		return false
	}
	dd.mu.Unlock()
	<-waitCh
	return true
}

func (dd *deduplicator) done(key string) {
	dd.mu.Lock()
	defer dd.mu.Unlock()

	if waitCh, exists := dd.waits[key]; exists {
		close(waitCh)
		delete(dd.waits, key)
	}
}
