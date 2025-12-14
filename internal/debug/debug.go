package debug

import (
	"context"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"os"
	"runtime"
	"runtime/debug"
	"time"

	"github.com/fugleadvokatene/bino/internal/generic"
	"github.com/fugleadvokatene/bino/internal/request"
	"github.com/shirou/gopsutil/v3/disk"
	"github.com/shirou/gopsutil/v3/host"
	"github.com/shirou/gopsutil/v3/load"
	"github.com/shirou/gopsutil/v3/mem"
)

type ConstantInfo struct {
	PublicIP    string
	TimeStarted time.Time
}

func NewRuntimeInfo() ConstantInfo {
	return ConstantInfo{
		PublicIP:    fetchPublicIP(),
		TimeStarted: time.Now(),
	}
}

func fetchPublicIP() string {
	resp, err := http.Get("https://api.ipify.org")
	if err != nil {
		return ""
	}
	defer resp.Body.Close()
	b, _ := io.ReadAll(resp.Body)
	return string(b)
}

type DebugInfo struct {
	Name     string
	Value    any
	Children []DebugInfo
}

func GetDebugInfo(ctx context.Context, runtimeInfo ConstantInfo) []DebugInfo {
	data := request.MustLoadCommonData(ctx)

	// Process info
	var procMem runtime.MemStats
	runtime.ReadMemStats(&procMem)

	// Machine info
	avg, err := load.Avg()
	if err != nil {
		request.LogCtx(ctx, slog.LevelWarn, "getting machine Avg", "err", err)
	}
	u, err := disk.Usage("/")
	if err != nil {
		request.LogCtx(ctx, slog.LevelWarn, "getting machine Disk usage", "err", err)
	}
	h, err := host.Info()
	if err != nil {
		request.LogCtx(ctx, slog.LevelWarn, "getting machine Info", "err", err)
	}
	users, err := host.Users()
	if err != nil {
		request.LogCtx(ctx, slog.LevelWarn, "getting machine Users", "err", err)
	}
	cwd, err := os.Getwd()
	if err != nil {
		request.LogCtx(ctx, slog.LevelWarn, "getting machine Getwd", "err", err)
	}
	mem, err := mem.VirtualMemory()
	if err != nil {
		request.LogCtx(ctx, slog.LevelWarn, "getting machine VirtualMemory", "err", err)
	}

	// Build info
	buildInfo := []DebugInfo{}
	if info, ok := debug.ReadBuildInfo(); ok {
		for _, setting := range info.Settings {
			buildInfo = append(buildInfo, DebugInfo{Name: setting.Key, Value: setting.Value})
		}
	}

	return []DebugInfo{
		{
			Name: "Machine",
			Children: []DebugInfo{
				{Name: "NumCPU", Value: runtime.NumCPU()},
				{Name: "System total load avg (up to 100% * n cores)", Value: fmt.Sprintf("%.1f", avg.Load1*100)},
				{Name: "Disk total (GB)", Value: toGB(u.Total)},
				{Name: "Disk available (GB)", Value: toGB(u.Free)},
				{Name: "Disk used (GB)", Value: toGB(u.Used)},
				{Name: "Hostname", Value: h.Hostname},
				{Name: "Uptime", Value: data.Language.FormatTimeAbsWithRelParen(time.Unix(int64(h.BootTime), 0))},
				{Name: "Public IP", Value: runtimeInfo.PublicIP},
				{Name: "Memory total (MB)", Value: toMB(mem.Total)},
				{Name: "Memory available (MB)", Value: toMB(mem.Available)},
				{Name: "Memory used (MB)", Value: toMB(mem.Used)},
				{Name: "Users", Children: generic.SliceToSlice(users, func(in host.UserStat) DebugInfo {
					return DebugInfo{
						Name:  "Username",
						Value: in.User,
					}
				})},
			},
		},
		{
			Name: "Process",
			Children: []DebugInfo{
				{Name: "Goroutines", Value: runtime.NumGoroutine()},
				{Name: "Started", Value: data.Language.FormatTimeAbsWithRelParen(runtimeInfo.TimeStarted)},
				{Name: "Alloc MB", Value: toMB(procMem.Alloc)},
				{Name: "Total MB", Value: toMB(procMem.Sys)},
				{Name: "Working directory", Value: cwd},
			},
		},
		{
			Name:     "Build",
			Children: buildInfo,
		},
	}
}

func toMB(v uint64) string {
	return fmt.Sprintf("%.0f", float64(v)/1024/1024)
}

func toGB(v uint64) string {
	return fmt.Sprintf("%.0f", float64(v)/1024/1024/1024)
}
