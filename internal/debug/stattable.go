package debug

import (
	"context"
	"runtime"
	"time"

	"github.com/fugleadvokatene/bino/internal/db"
	"github.com/fugleadvokatene/bino/internal/model"
	"github.com/fugleadvokatene/bino/internal/sql"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/shirou/gopsutil/v3/disk"
	"github.com/shirou/gopsutil/v3/load"
	"github.com/shirou/gopsutil/v3/mem"
)

func StoreDebugStats(ctx context.Context, db *db.Database) (int64, error) {
	t := pgtype.Timestamptz{Time: time.Now(), Valid: true}

	var keys []int16
	var values []float32

	add := func(k model.DebugStatKey, v float32) {
		keys = append(keys, int16(k))
		values = append(values, v)
	}

	// Process info
	var procMem runtime.MemStats
	runtime.ReadMemStats(&procMem)
	add(model.DebugStatKeyProcMemAllocatedMB, toMBf(procMem.Alloc))
	add(model.DebugStatKeyProcVRAMReservedMB, toMBf(procMem.Sys))
	add(model.DebugStatKeyProcNGoroutines, float32(runtime.NumGoroutine()))

	// Machine info
	if u, err := disk.Usage("/"); err == nil {
		add(model.DebugStatKeyMachineDiskSizeGB, toGBf(u.Total))
		add(model.DebugStatKeyMachineDiskAvailableGB, toGBf(u.Free))
		add(model.DebugStatKeyMachineDiskUsedGB, toGBf(u.Used))
	}
	if avg, err := load.Avg(); err == nil {
		add(model.DebugStatKeyMachineLoadPercent, (float32(avg.Load1)*100.0)/float32(runtime.NumCPU()))
	}
	if mem, err := mem.VirtualMemory(); err == nil {
		add(model.DebugStatKeyMachineMemSizeMB, toMBf(mem.Total))
		add(model.DebugStatKeyMachineMemAvailableMB, toMBf(mem.Available))
		add(model.DebugStatKeyMachineMemUsedMB, toMBf(mem.Used))
	}

	return db.Q.StatDebugInsert(ctx, sql.StatDebugInsertParams{
		Time:  t,
		Key:   keys,
		Value: values,
	})
}
