package generic

import (
	"fmt"
	"strconv"
)

func Pointer[T any](x T) *T {
	return &x
}

func MapToMapErr[K comparable, VIn any, VOut any](in map[K]VIn, f func(VIn) (VOut, error)) (map[K]VOut, error) {
	if in == nil {
		return nil, fmt.Errorf("called MapToMapErr on nil map")
	}
	out := make(map[K]VOut)
	for k, vin := range in {
		vout, err := f(vin)
		if err != nil {
			return nil, err
		}
		out[k] = vout
	}
	return out, nil
}

func IDSlice(in []string) ([]int32, error) {
	if in == nil {
		return nil, fmt.Errorf("called IDSlice on nil slice")
	}
	out := make([]int32, len(in))
	for i, s := range in {
		v, err := strconv.ParseInt(s, 10, 32)
		if err != nil {
			return nil, err
		}
		out[i] = int32(v)
	}
	return out, nil
}

func SliceToMap[TIn any, KOut comparable, VOut any](in []TIn, f func(TIn) (KOut, VOut)) map[KOut]VOut {
	if in == nil {
		return nil
	}
	out := make(map[KOut]VOut, len(in))
	for _, vin := range in {
		k, vout := f(vin)
		out[k] = vout
	}
	return out
}

func MapToMap[TKey comparable, VIn any, VOut any](in map[TKey]VIn, f func(TKey) VOut) map[TKey]VOut {
	if in == nil {
		return nil
	}
	out := make(map[TKey]VOut, len(in))
	for k := range in {
		out[k] = f(k)
	}
	return out
}

func SliceToSlice[TIn any, TOut any](in []TIn, f func(TIn) TOut) []TOut {
	if in == nil {
		return nil
	}
	out := make([]TOut, len(in))
	for i, v := range in {
		out[i] = f(v)
	}
	return out
}

func Flatten[T any, U any](elems []T, f func(T) []U) []U {
	var out []U
	for _, elem := range elems {
		out = append(out, f(elem)...)
	}
	return out
}

func MapToSlice[KIn comparable, VIn any, TOut any](in map[KIn]VIn, f func(KIn, VIn) TOut) []TOut {
	if in == nil {
		return nil
	}
	out := make([]TOut, 0, len(in))
	for k, v := range in {
		out = append(out, f(k, v))
	}
	return out
}

func SliceToMapErr[TIn any, KOut comparable, VOut any](in []TIn, f func(int, TIn) (KOut, VOut, error)) (map[KOut]VOut, error) {
	if in == nil {
		return nil, fmt.Errorf("called SliceToMapErr on nil slice")
	}
	out := make(map[KOut]VOut, len(in))
	for i, vin := range in {
		k, vout, err := f(i, vin)
		if err != nil {
			return nil, err
		}
		out[k] = vout
	}
	return out, nil
}

func FilterSlice[TIn any](in []TIn, f func(v TIn) bool) []TIn {
	if in == nil {
		return nil
	}
	out := make([]TIn, 0, len(in))
	for _, v := range in {
		if f(v) {
			out = append(out, v)
		}
	}
	return out
}

func PartitionSlice[TIn any](in []TIn, f func(v TIn) bool) ([]TIn, []TIn) {
	if in == nil {
		return nil, nil
	}
	outTrue := make([]TIn, 0)
	outFalse := make([]TIn, 0)
	for _, v := range in {
		if f(v) {
			outTrue = append(outTrue, v)
		} else {
			outFalse = append(outFalse, v)
		}
	}
	return outTrue, outFalse
}

func Find[TIn any](in []TIn, f func(v TIn) bool) int {
	for i, v := range in {
		if f(v) {
			return i
		}
	}
	return -1
}

func FindKey[KIn comparable, VIn any](in map[KIn]VIn, f func(k KIn, v VIn) bool) (KIn, bool) {
	for k, v := range in {
		if f(k, v) {
			return k, true
		}
	}
	return *new(KIn), false
}

func FindValue[KIn comparable, VIn any](in map[KIn]VIn, f func(k KIn, v VIn) bool) (VIn, bool) {
	for k, v := range in {
		if f(k, v) {
			return v, true
		}
	}
	return *new(VIn), false
}

func MoveToFront[T any](in []T, j int) {
	for i := j; i > 0; i-- {
		in[i], in[i-1] = in[i-1], in[i]
	}
}

func Any[T any](in []T, f func(in T) bool) bool {
	for _, x := range in {
		if f(x) {
			return true
		}
	}
	return false
}

func Clear[T any](in *T) {
	*in = *(new(T))
}
