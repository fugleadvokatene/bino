package main

import (
	"fmt"
)

func FormID(prefix, field string, id int32) string {
	return fmt.Sprintf("%s%s-%d", prefix, field, id)
}
