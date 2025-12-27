package generic

import (
	"errors"
	"reflect"
	"testing"
)

func TestMapToMapErr(t *testing.T) {
	_, err := MapToMapErr[int, int, int](nil, func(v int) (int, error) { return v, nil })
	if err == nil {
		t.Fail()
	}

	in := map[int]int{1: 2}
	out, err := MapToMapErr(in, func(v int) (int, error) { return v * 2, nil })
	if err != nil || out[1] != 4 {
		t.Fail()
	}

	_, err = MapToMapErr(in, func(v int) (int, error) { return 0, errors.New("x") })
	if err == nil {
		t.Fail()
	}
}

func TestIDSlice(t *testing.T) {
	_, err := IDSlice(nil)
	if err == nil {
		t.Fail()
	}

	out, err := IDSlice([]string{"1", "2"})
	if err != nil || !reflect.DeepEqual(out, []int32{1, 2}) {
		t.Fail()
	}

	_, err = IDSlice([]string{"x"})
	if err == nil {
		t.Fail()
	}
}

func TestSliceToMap(t *testing.T) {
	out := SliceToMap([]int{1, 2}, func(v int) (int, int) { return v, v * 10 })
	if out[1] != 10 || out[2] != 20 {
		t.Fail()
	}

	if SliceToMap[int, int, int](nil, nil) != nil {
		t.Fail()
	}
}

func TestMapToMap(t *testing.T) {
	in := map[string]int{"a": 1}
	out := MapToMap(in, func(k string) int { return len(k) })
	if out["a"] != 1 {
		t.Fail()
	}
}

func TestSliceToSlice(t *testing.T) {
	out := SliceToSlice([]int{1, 2}, func(v int) int { return v * 2 })
	if !reflect.DeepEqual(out, []int{2, 4}) {
		t.Fail()
	}
}

func TestFlatten(t *testing.T) {
	out := Flatten([]int{1, 2}, func(v int) []int { return []int{v, v} })
	if !reflect.DeepEqual(out, []int{1, 1, 2, 2}) {
		t.Fail()
	}
}

func TestMapToSlice(t *testing.T) {
	in := map[int]int{1: 2}
	out := MapToSlice(in, func(k, v int) int { return k + v })
	if len(out) != 1 || out[0] != 3 {
		t.Fail()
	}
}

func TestSliceToMapErr(t *testing.T) {
	_, err := SliceToMapErr[int, int, int](nil, nil)
	if err == nil {
		t.Fail()
	}

	out, err := SliceToMapErr([]int{1}, func(i, v int) (int, int, error) {
		return i, v * 2, nil
	})
	if err != nil || out[0] != 2 {
		t.Fail()
	}
}

func TestFilterSlice(t *testing.T) {
	out := FilterSlice([]int{1, 2, 3}, func(v int) bool { return v%2 == 1 })
	if !reflect.DeepEqual(out, []int{1, 3}) {
		t.Fail()
	}
}

func TestFind(t *testing.T) {
	i := Find([]int{1, 2, 3}, func(v int) bool { return v == 2 })
	if i != 1 {
		t.Fail()
	}
}

func TestFindKeyValue(t *testing.T) {
	m := map[string]int{"a": 1}
	k, ok := FindKey(m, func(k string, v int) bool { return v == 1 })
	if !ok || k != "a" {
		t.Fail()
	}

	v, ok := FindValue(m, func(k string, v int) bool { return k == "a" })
	if !ok || v != 1 {
		t.Fail()
	}
}

func TestMoveToFront(t *testing.T) {
	in := []int{1, 2, 3}
	MoveToFront(in, 2)
	if !reflect.DeepEqual(in, []int{3, 1, 2}) {
		t.Fail()
	}
}

func TestAny(t *testing.T) {
	if !Any([]int{1, 2}, func(v int) bool { return v == 2 }) {
		t.Fail()
	}
}

func TestClear(t *testing.T) {
	x := 10
	Clear(&x)
	if x != 0 {
		t.Fail()
	}
}
