package generic

import "testing"

func TestNewSet(t *testing.T) {
	s := NewSet(1, 2, 2)

	if len(s) != 2 {
		t.Fail()
	}

	if !s.Contains(1) || !s.Contains(2) {
		t.Fail()
	}
}

func TestSetAdd(t *testing.T) {
	s := NewSet[int]()
	s.Add(3)

	if !s.Contains(3) {
		t.Fail()
	}
}

func TestSetContains(t *testing.T) {
	s := NewSet("a")

	if s.Contains("b") {
		t.Fail()
	}
}

func TestSliceToSet(t *testing.T) {
	in := []string{"a", "bb", "ccc"}
	s := SliceToSet(in, func(v string) int { return len(v) })

	if len(s) != 3 {
		t.Fail()
	}

	if !s.Contains(1) || !s.Contains(2) || !s.Contains(3) {
		t.Fail()
	}
}
