package security

type Config struct {
	// If disabled (default), disable any proxying features (e.g. fetch image by link)
	AllowUserDefinedHTTPRequests bool
}
