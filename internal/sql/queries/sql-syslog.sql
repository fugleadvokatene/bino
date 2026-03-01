-- name: SysLogInsert :exec
INSERT INTO syslog (
    message,
    severity,
    time
) VALUES (
    @message,
    @severity,
    @time
);

-- name: SysLogGet :many
SELECT *
FROM syslog
ORDER BY id DESC
LIMIT @lim
OFFSET @offs
;

-- name: SysLogDrop :execrows
DELETE
FROM syslog
WHERE time < NOW() - @threshold
;
