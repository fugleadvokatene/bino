package model

import "github.com/fugleadvokatene/bino/internal/generic"

type ToModel[T any] interface {
	ToModel() T
}

type ToModelArg[T any, V any] interface {
	ToModel(v V) T
}

func SliceToModel[T any, U ToModel[T]](in []U) []T {
	return generic.SliceToSlice(in, func(in U) T {
		return in.ToModel()
	})
}

func SliceToModelArg[T any, U ToModelArg[T, V], V any](in []U, v V) []T {
	return generic.SliceToSlice(in, func(in U) T {
		return in.ToModel(v)
	})
}
