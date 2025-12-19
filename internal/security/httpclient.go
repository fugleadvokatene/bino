package security

import (
	"bytes"
	"context"
	"crypto/tls"
	"fmt"
	"io"
	"net"
	"net/http"
	"time"
)

const (
	totalDeadlineSeconds = 30
	timeoutSeconds       = 10
	keepAliveSeconds     = 20
	maxRedirects         = 4
	maxContentSizeMB     = 20
)

type FetchInfo struct {
	ContentLength int64
	ContentType   string
}

func Fetch(ctx context.Context, url string, checkContentType func(ct string) error) (io.Reader, *FetchInfo, error) {
	// Set max limit on the whole transaction
	ctx, cancel := context.WithTimeout(ctx, totalDeadlineSeconds*time.Second)
	defer cancel()

	// Check the URL
	if err := CheckURL(url); err != nil {
		return nil, nil, err
	}

	// Send the request
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, nil, err
	}
	resp, err := newHTTPClient().Do(req)
	if err != nil {
		return nil, nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, nil, fmt.Errorf("server response: %d", resp.StatusCode)
	}

	// Check (purported) content-type
	ct := resp.Header.Get("Content-Type")
	if ct == "" {
		return nil, nil, fmt.Errorf("missing content type")
	}
	if err := checkContentType(ct); err != nil {
		return nil, nil, err
	}

	// Check (purported) content length
	if contentMB := resp.ContentLength / (1024 * 1024); contentMB > maxContentSizeMB {
		return nil, nil, fmt.Errorf("content too large: %d MB > %d", contentMB, maxContentSizeMB)
	}

	// Read max length into a buffer
	reader := io.LimitReader(resp.Body, maxContentSizeMB*1024*1024+1)
	buf := &bytes.Buffer{}
	n, err := io.Copy(buf, reader)
	if err != nil {
		return nil, nil, err
	}
	if n > maxContentSizeMB*1024*1024 {
		return nil, nil, fmt.Errorf("content too large: read up to max limit of %d MB", maxContentSizeMB)
	}

	// Sniff the content type and check
	sniffedCT := http.DetectContentType(buf.Bytes())
	if err := checkContentType(sniffedCT); err != nil {
		return nil, nil, err
	}
	ct = sniffedCT

	// Okidoki
	return buf, &FetchInfo{
		ContentLength: resp.ContentLength,
		ContentType:   ct,
	}, nil
}

func newHTTPClient() *http.Client {
	// Set dialer with timeout
	d := &net.Dialer{
		Timeout:   timeoutSeconds * time.Second,
		KeepAlive: keepAliveSeconds * time.Second,
	}
	tr := &http.Transport{
		Proxy: http.ProxyFromEnvironment,
		DialContext: func(ctx context.Context, network, addr string) (net.Conn, error) {
			// Parse address
			host, _, err := net.SplitHostPort(addr)
			if err != nil {
				return nil, err
			}

			// Check IP(s)
			if ip := net.ParseIP(host); ip != nil {
				if err := checkIP(ip); err != nil {
					return nil, err
				}
			} else {
				ips, err := net.DefaultResolver.LookupIP(ctx, "ip", host)
				if err != nil {
					return nil, err
				}
				for _, ip := range ips {
					if err := checkIP(ip); err != nil {
						return nil, err
					}
				}
			}
			return d.DialContext(ctx, network, addr)
		},
		TLSClientConfig: &tls.Config{
			MinVersion: tls.VersionTLS12,
		},
		TLSHandshakeTimeout:   10 * time.Second,
		ResponseHeaderTimeout: 10 * time.Second,
		ExpectContinueTimeout: 1 * time.Second,
		IdleConnTimeout:       30 * time.Second,
		MaxConnsPerHost:       10,
	}
	return &http.Client{
		Transport: tr,
		CheckRedirect: func(req *http.Request, via []*http.Request) error {
			if len(via) > maxRedirects {
				return fmt.Errorf("too many redirects")
			}
			return CheckURL(req.URL.String())
		},
	}
}
