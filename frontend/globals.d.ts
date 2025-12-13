export {}

declare global {
  interface Window {
    LN: Record<string, string>
  }

  const LN: Record<string, string>

  const htmx: {
    trigger: (elt: Element, eventName: string) => void
  }
}
