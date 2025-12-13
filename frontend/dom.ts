// Typed querySelector
export const QuerySelector = <T extends Element>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel)

// Typed querySelectorAll
export const QuerySelectorAll = <T extends Element>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel))

