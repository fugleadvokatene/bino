package generic

type Set[T comparable] map[T]struct{}

func NewSet[T comparable](elems ...T) Set[T] {
	out := make(Set[T])
	for _, elem := range elems {
		out.Add(elem)
	}
	return out
}

func (s Set[T]) Add(elem T) {
	s[elem] = struct{}{}
}

func (s Set[T]) Contains(elem T) bool {
	_, found := s[elem]
	return found
}

func SliceToSet[U any, T comparable](in []U, f func(in U) T) Set[T] {
	return SliceToMap(in, func(in U) (T, struct{}) {
		return f(in), struct{}{}
	})
}
