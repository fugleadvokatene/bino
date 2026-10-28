import { describe, expect, it } from 'vitest'
import {
  gdocsToTiptap,
  tiptapToGdocs,
  type GDocsDoc,
  type GDocsPara,
  type GDocsRun,
  type TiptapNode
} from './journal-converter'

// Helpers to build GDocsDoc fixtures concisely
function text(content: string, style: Partial<GDocsRun> = {}): GDocsRun {
  return { text: content, ...style }
}

function para(runs: GDocsRun[], heading = 0, paraId = -1): GDocsPara {
  return { paraId, heading, list: false, ordered: false, nesting: 0, runs }
}

function item(runs: GDocsRun[], ordered = false, paraId = -1): GDocsPara {
  return { paraId, heading: 0, list: true, ordered, nesting: 0, runs }
}

function image(
  imageId: string,
  url: string,
  width = 100,
  height = 100,
  crop: [number, number, number, number] = [0, 0, 0, 0]
): GDocsRun {
  return { imageId, url, width, height, crop }
}

function doc(...paragraphs: GDocsPara[]): GDocsDoc {
  return { paragraphs }
}

function roundtrip(input: GDocsDoc): GDocsDoc {
  return tiptapToGdocs(gdocsToTiptap(input))
}

describe('roundtrip: GDocsDoc → TipTap → GDocsDoc', () => {
  it('plain paragraph', () => {
    const input = doc(para([text('Hello world')]))
    expect(roundtrip(input)).toEqual(input)
  })

  it('bold text', () => {
    const input = doc(para([text('bold', { bold: true })]))
    expect(roundtrip(input)).toEqual(input)
  })

  it('italic text', () => {
    const input = doc(para([text('italic', { italic: true })]))
    expect(roundtrip(input)).toEqual(input)
  })

  it('underline text', () => {
    const input = doc(para([text('underline', { underline: true })]))
    expect(roundtrip(input)).toEqual(input)
  })

  it('strikethrough text', () => {
    const input = doc(para([text('strike', { strikethrough: true })]))
    expect(roundtrip(input)).toEqual(input)
  })

  it('combined marks: bold + italic', () => {
    const input = doc(para([text('both', { bold: true, italic: true })]))
    expect(roundtrip(input)).toEqual(input)
  })

  it('link', () => {
    const input = doc(para([text('click', { link: 'https://example.com' })]))
    expect(roundtrip(input)).toEqual(input)
  })

  it('mixed marks in one paragraph', () => {
    const input = doc(
      para([
        text('plain '),
        text('bold ', { bold: true }),
        text('italic', { italic: true })
      ])
    )
    expect(roundtrip(input)).toEqual(input)
  })

  it('paragraph IDs are preserved', () => {
    const input = doc(para([text('first')], 0, 3), para([text('second')], 2, 7))
    expect(roundtrip(input)).toEqual(input)
  })

  it('title', () => {
    const input = doc(para([text('Title')], 1))
    expect(roundtrip(input)).toEqual(input)
  })

  it('heading', () => {
    const input = doc(para([text('Section')], 2))
    expect(roundtrip(input)).toEqual(input)
  })

  it('heading with no runs is preserved', () => {
    const input = doc(para([], 2))
    expect(roundtrip(input)).toEqual(input)
  })

  it('bullet list', () => {
    const input = doc(item([text('first')]), item([text('second')]))
    expect(roundtrip(input)).toEqual(input)
  })

  it('ordered list', () => {
    const input = doc(item([text('one')], true), item([text('two')], true))
    expect(roundtrip(input)).toEqual(input)
  })

  it('inline image', () => {
    const input = doc(
      para([
        image('kix.abc', '/files/bird.jpg', 800, 600, [0.1, 0.05, 0.1, 0.05])
      ])
    )
    expect(roundtrip(input)).toEqual(input)
  })

  it('mixed content: heading, paragraph, list', () => {
    const input = doc(
      para([text('My heading')], 2),
      para([text('Intro text with '), text('bold', { bold: true })]),
      item([text('item A')]),
      item([text('item B')])
    )
    expect(roundtrip(input)).toEqual(input)
  })

  it('empty paragraphs are kept', () => {
    const input = doc(
      para([text('real content')]),
      para([]),
      para([text('more')])
    )
    expect(roundtrip(input)).toEqual(input)
  })

  it('empty text runs are dropped', () => {
    const input = doc(para([text('a'), text(''), text('b')]))
    expect(roundtrip(input)).toEqual(doc(para([text('a'), text('b')])))
  })
})

describe('tiptapToGdocs', () => {
  it('unknown node types are ignored', () => {
    const tiptap: TiptapNode = {
      type: 'doc',
      content: [
        { type: 'unknownThing', content: [] },
        { type: 'paragraph', content: [{ type: 'text', text: 'kept' }] }
      ]
    }
    expect(tiptapToGdocs(tiptap)).toEqual(doc(para([text('kept')])))
  })

  it('null/missing content is treated as empty', () => {
    const tiptap: TiptapNode = { type: 'doc' }
    expect(tiptapToGdocs(tiptap)).toEqual(doc())
  })

  it('heading level is read from attrs', () => {
    const tiptap: TiptapNode = {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 3 },
          content: [{ type: 'text', text: 'Deep' }]
        }
      ]
    }
    expect(tiptapToGdocs(tiptap)).toEqual(doc(para([text('Deep')], 3)))
  })

  it('nested lists get increasing nesting', () => {
    const tiptap: TiptapNode = {
      type: 'doc',
      content: [
        {
          type: 'bulletList',
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'parent' }]
                },
                {
                  type: 'orderedList',
                  content: [
                    {
                      type: 'listItem',
                      content: [
                        {
                          type: 'paragraph',
                          content: [{ type: 'text', text: 'child' }]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
    expect(tiptapToGdocs(tiptap)).toEqual(
      doc(item([text('parent')]), {
        ...item([text('child')], true),
        nesting: 1
      })
    )
  })
})

describe('gdocsToTiptap', () => {
  it('empty doc produces empty doc', () => {
    expect(gdocsToTiptap(doc())).toEqual({ type: 'doc', content: [] })
  })

  it('consecutive list items are grouped into one list', () => {
    const result = gdocsToTiptap(
      doc(item([text('a')]), item([text('b')]), para([text('after')]))
    )
    expect(result.content).toHaveLength(2)
    expect(result.content![0].type).toBe('bulletList')
    expect(result.content![0].content).toHaveLength(2)
    expect(result.content![1].type).toBe('paragraph')
  })

  it('null runs are treated as empty', () => {
    const p = { ...para([]), runs: null as unknown as GDocsRun[] }
    const result = gdocsToTiptap(doc(p))
    expect(result.content![0].content).toEqual([])
  })
})
