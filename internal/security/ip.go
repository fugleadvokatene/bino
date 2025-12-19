package security

import (
	"fmt"
	"net"
	"net/netip"

	"github.com/fugleadvokatene/bino/internal/generic"
)

var ipDenyList = generic.NewSet[netip.Addr](
	// cloud metadata endpoints
	netip.MustParseAddr("169.254.169.254"),
	// Azure's additional magic address
	netip.MustParseAddr("168.63.129.16"),
)

type ipBlocked struct {
	IP     net.IP
	Reason string
}

func (err ipBlocked) Error() string {
	return fmt.Sprintf("ip %s is blocked because %s", err.IP, err.Reason)
}

func IPBlocked(ip net.IP, reason string) error {
	return ipBlocked{IP: ip, Reason: reason}
}

// Returns nil if we allow the server to perform a HTTP request towards the user-provided IP address.
func checkIP(ip net.IP) error {
	ip = ip.To16()
	if ip == nil {
		return IPBlocked(ip, "invalid IP")
	}
	if v4 := ip.To4(); v4 != nil {
		ip = v4
	}
	if !ip.IsGlobalUnicast() {
		return IPBlocked(ip, "not a global unicast address")
	}
	netipaddr, ok := netip.AddrFromSlice(ip)
	if !ok {
		return IPBlocked(ip, "failed to convert to net/netip.Addr")
	}
	if ipDenyList.Contains(netipaddr) {
		return IPBlocked(ip, "explicitly denylisted")
	}
	return nil
}
