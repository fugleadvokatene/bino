// Typed querySelector
export const QuerySelector = <T extends Element>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel)
export const MustQuerySelector = <T extends Element>(sel: string, root: ParentNode = document) => {
    const v = QuerySelector<T>(sel, root);
    if (!v) {
        throw new Error(`${sel} not found on ${root.nodeName}`);
    }
    return v;
}

// Typed querySelectorAll
export const QuerySelectorAll = <T extends Element>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel))

