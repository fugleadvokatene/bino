package sql

import (
	"fmt"
	"os"

	"github.com/pingcap/errors"
)

type Credentials struct {
	pass string
	host string
	port string
}

func NewCredentials(pass, host, port string) *Credentials {
	return &Credentials{
		pass: pass,
		host: host,
		port: port,
	}
}

func NewCredentialsFromEnv() (*Credentials, error) {
	pass := os.Getenv("BINO_DB_PASSWORD")
	if pass == "" {
		return nil, errors.New("missing env variable: BINO_DB_PASSWORD")
	}

	host := os.Getenv("BINO_DB_HOST")
	if host == "" {
		return nil, errors.New("missing env variable: BINO_DB_HOST")
	}

	port := os.Getenv("BINO_DB_PORT")
	if port == "" {
		return nil, errors.New("missing env variable: BINO_DB_PORT")
	}

	return NewCredentials(pass, host, port), nil
}

func (c *Credentials) URL() string {
	return fmt.Sprintf("postgres://bino:%s@%s:%s/bino?sslmode=disable", c.pass, c.host, c.port)
}
