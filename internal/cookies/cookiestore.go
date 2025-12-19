package cookies

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/sessions"
)

type CookieStore struct {
	Backend *sessions.CookieStore
}

func New(sessionKeyLocation string) (*CookieStore, error) {
	sessionKey, err := os.ReadFile(sessionKeyLocation)
	if err != nil {
		return nil, err
	}

	backend := sessions.NewCookieStore(sessionKey)
	backend.Options.HttpOnly = true
	backend.Options.SameSite = http.SameSiteLaxMode
	backend.Options.Secure = true

	return &CookieStore{
		Backend: backend,
	}, nil
}
func (c *CookieStore) Set(w http.ResponseWriter, r *http.Request, key string, subkey string, value any) error {
	// Try to marshal the feedback we have now
	str, err := json.Marshal(value)
	if err != nil {
		return fmt.Errorf("marshalling feedback: %w", err)
	}

	// Set cookie
	sess, _ := c.Backend.Get(r, key)
	sess.Values[subkey] = string(str)
	sess.Options.MaxAge = 3600
	if err := sess.Save(r, w); err != nil {
		return fmt.Errorf("saving cookie for '%s': %w", key, err)
	}

	return nil
}

func (c *CookieStore) Get(r *http.Request, key string, subkey string, value any) (bool, error) {
	// Get the feedback cookie and destroy it
	sess, err := c.Backend.Get(r, key)
	if err != nil {
		return false, fmt.Errorf("failed to decode cookie session: %w", err)
	}

	// Try to get the cookie
	str, ok := sess.Values[subkey].(string)
	if !ok {
		return false, nil
	}

	// Try to unmarshal it
	if err := json.Unmarshal([]byte(str), &value); err != nil {
		return false, fmt.Errorf("failed to unmarshal cookie '%s': %w", key, err)
	}

	return true, nil
}

func (c *CookieStore) Eat(w http.ResponseWriter, r *http.Request, key string, subkey string, value any) (bool, error) {
	// Get the feedback cookie and destroy it
	sess, err := c.Backend.Get(r, key)
	if err != nil {
		return false, fmt.Errorf("failed to decode cookie session: %w", err)
	}

	// Try to get the cookie, eat it regardless
	str, ok := sess.Values[subkey].(string)
	sess.Options.MaxAge = -1
	if err := sess.Save(r, w); err != nil {
		return false, fmt.Errorf("deleting cookie '%s': %w", key, err)
	}
	if !ok {
		return false, nil
	}

	// Try to unmarshal it
	if err := json.Unmarshal([]byte(str), &value); err != nil {
		return false, fmt.Errorf("failed to unmarshal cookie '%s': %w", key, err)
	}

	return true, nil
}

func (c *CookieStore) Delete(w http.ResponseWriter, r *http.Request, key string) {
	sess, err := c.Backend.Get(r, key)
	if err != nil {
		return
	}
	sess.Options.MaxAge = -1
	_ = sess.Save(r, w)
}
