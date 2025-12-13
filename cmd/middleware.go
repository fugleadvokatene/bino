package main

import (
	"fmt"
	"net/http"
	"runtime/debug"
	"time"

	"github.com/fugleadvokatene/bino/internal/request"
)

func WithLogging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		request.LogR(
			r,
			"%s %s %s",
			r.Method,
			r.URL.Path,
			time.Since(start),
		)
		r.ParseForm()
		for k, v := range r.Form {
			request.LogR(
				r,
				"Form value: %s=%+v",
				k,
				v,
			)
		}
	})
}

func WithRecover(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if rec := recover(); rec != nil {
				msg := fmt.Sprintf("runtime panic: %s\ntraceback: %s", rec, string(debug.Stack()))
				http.Error(w, msg, http.StatusInternalServerError)
				fmt.Println(msg)
			}
		}()
		next.ServeHTTP(w, r)
	})
}

func Chain(h http.Handler, m ...func(http.Handler) http.Handler) http.Handler {
	for i := len(m) - 1; i >= 0; i-- {
		h = m[i](h)
	}
	return h
}

func Chainf(h http.HandlerFunc, m ...func(http.Handler) http.Handler) http.Handler {
	return Chain(h, m...)
}
