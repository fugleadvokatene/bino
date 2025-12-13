package db

import "context"

func (db *Database) DeleteStaleSessions(ctx context.Context) (int64, error) {
	tag, err := db.Q.DeleteStaleSessions(ctx)
	return tag.RowsAffected(), err
}

func (db *Database) DeleteExpiredInvitations(ctx context.Context) (int64, error) {
	tag, err := db.Q.DeleteExpiredInvitations(ctx)
	return tag.RowsAffected(), err
}

func (db *Database) RemoveFalseFileWikiLinks(ctx context.Context) (int64, error) {
	tag, err := db.Q.RemoveFalseFileWikiLinks(ctx)
	return tag.RowsAffected(), err
}
