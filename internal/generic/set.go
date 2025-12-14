package generic

type Set[T comparable] map[T]struct{}

func NewSet[T comparable]() Set[T] {
	return make(Set[T])
}

func SliceToSet[U any, T comparable](in []U, f func(in U) T) Set[T] {
	return SliceToMap(in, func(in U) (T, struct{}) {
		return f(in), struct{}{}
	})
}
