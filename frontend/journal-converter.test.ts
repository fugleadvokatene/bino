import { describe, expect, it } from 'vitest'
import {
  FLAG_BOLD,
  FLAG_ITALIC,
  FLAG_LINK,
  FLAG_STRIKETHROUGH,
  FLAG_UNDERLINE,
  documentToTiptap,
  tiptapToDocument,
  type DocElement,
  type TiptapNode
} from './journal-converter'

// Helpers to build DocElement fixtures concisely
function text(content: string, flags = 0, linkURL = ''): DocElement {
  return {
    Type: 'text',
    Value: { Content: content, Flags: flags, FontSize: 0, LinkURL: linkURL }
  }
}

function para(elements: DocElement[], headingLevel = 0): DocElement {
  return {
    Type: 'paragraph',
    Value: { Elements: elements, HeadingLevel: headingLevel }
  }
}

function list(items: DocElement[], ordered = false, nesting = 0): DocElement {
  return {
    Type: 'list',
    Value: { Items: items, Ordered: ordered, Nesting: nesting }
  }
}

function image(
  url: string,
  description = '',
  width = 100,
  height = 100,
  crop: [number, number, number, number] = [0, 0, 0, 0]
): DocElement {
  return {
    Type: 'image',
    Value: {
      Title: '',
      Description: description,
      Width: width,
      Height: height,
      Crop: crop,
      URL: url,
      InlineObjectID: ''
    }
  }
}

function roundtrip(input: DocElement[]): DocElement[] {
  return tiptapToDocument(documentToTiptap(input))
}

describe('roundtrip: DocElement[] → TipTap → DocElement[]', () => {
  it('plain paragraph', () => {
    const input = [para([text('Hello world')])]
    expect(roundtrip(input)).toEqual(input)
  })

  it('bold text', () => {
    const input = [para([text('bold', FLAG_BOLD)])]
    expect(roundtrip(input)).toEqual(input)
  })

  it('italic text', () => {
    const input = [para([text('italic', FLAG_ITALIC)])]
    expect(roundtrip(input)).toEqual(input)
  })

  it('underline text', () => {
    const input = [para([text('underline', FLAG_UNDERLINE)])]
    expect(roundtrip(input)).toEqual(input)
  })

  it('strikethrough text', () => {
    const input = [para([text('strike', FLAG_STRIKETHROUGH)])]
    expect(roundtrip(input)).toEqual(input)
  })

  it('combined marks: bold + italic', () => {
    const input = [para([text('both', FLAG_BOLD | FLAG_ITALIC)])]
    expect(roundtrip(input)).toEqual(input)
  })

  it('link', () => {
    const input = [para([text('click', FLAG_LINK, 'https://example.com')])]
    expect(roundtrip(input)).toEqual(input)
  })

  it('mixed marks in one paragraph', () => {
    const input = [
      para([
        text('plain '),
        text('bold ', FLAG_BOLD),
        text('italic', FLAG_ITALIC)
      ])
    ]
    expect(roundtrip(input)).toEqual(input)
  })

  it('heading level 1', () => {
    const input = [para([text('Title')], 1)]
    expect(roundtrip(input)).toEqual(input)
  })

  it('heading level 2', () => {
    const input = [para([text('Section')], 2)]
    expect(roundtrip(input)).toEqual(input)
  })

  it('heading with empty elements is preserved', () => {
    const input = [para([], 2)]
    expect(roundtrip(input)).toEqual(input)
  })

  it('bullet list', () => {
    const input = [list([para([text('first')]), para([text('second')])])]
    expect(roundtrip(input)).toEqual(input)
  })

  it('ordered list', () => {
    const input = [list([para([text('one')]), para([text('two')])], true)]
    expect(roundtrip(input)).toEqual(input)
  })

  it('nested list', () => {
    // The inner list is at depth 1; tiptapListToDoc reconstructs Nesting from structure
    const input = [
      list([
        para([text('parent')]),
        list([para([text('child')])], false, 1),
        para([text('sibling')])
      ])
    ]
    expect(roundtrip(input)).toEqual(input)
  })

  it('inline image', () => {
    const input = [
      para([
        image('/files/bird.jpg', 'A bird', 800, 600, [0.1, 0.05, 0.1, 0.05])
      ])
    ]
    expect(roundtrip(input)).toEqual(input)
  })

  it('mixed content: heading, paragraph, list', () => {
    const input = [
      para([text('My heading')], 2),
      para([text('Intro text with '), text('bold', FLAG_BOLD)]),
      list([para([text('item A')]), para([text('item B')])])
    ]
    expect(roundtrip(input)).toEqual(input)
  })

  it('empty paragraphs are dropped', () => {
    const input = [
      para([text('real content')]),
      para([]),
      para([text('  ')]),
      para([text('more content')])
    ]
    const expected = [
      para([text('real content')]),
      para([text('more content')])
    ]
    expect(roundtrip(input)).toEqual(expected)
  })

  it('multiple paragraphs', () => {
    const input = [
      para([text('First paragraph')]),
      para([text('Second paragraph')]),
      para([text('Third paragraph')])
    ]
    expect(roundtrip(input)).toEqual(input)
  })
})

describe('tiptapToDocument', () => {
  it('unknown node types are ignored', () => {
    const tiptap: TiptapNode = {
      type: 'doc',
      content: [
        { type: 'unknownThing', content: [] },
        { type: 'paragraph', content: [{ type: 'text', text: 'kept' }] }
      ]
    }
    expect(tiptapToDocument(tiptap)).toEqual([para([text('kept')])])
  })

  it('null/missing content is treated as empty', () => {
    const tiptap: TiptapNode = { type: 'doc' }
    expect(tiptapToDocument(tiptap)).toEqual([])
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
    expect(tiptapToDocument(tiptap)).toEqual([para([text('Deep')], 3)])
  })
})

describe('documentToTiptap', () => {
  it('empty array produces empty doc', () => {
    expect(documentToTiptap([])).toEqual({ type: 'doc', content: [] })
  })

  it('heading always included even with no elements', () => {
    const input = [para([], 2)]
    const result = documentToTiptap(input)
    expect(result.content).toHaveLength(1)
    expect(result.content![0].type).toBe('heading')
  })

  it('whitespace-only paragraph is excluded', () => {
    const input = [para([text('   ')])]
    const result = documentToTiptap(input)
    expect(result.content).toHaveLength(0)
  })

  it('paragraph with image is included', () => {
    const input = [para([image('/img.jpg')])]
    const result = documentToTiptap(input)
    expect(result.content).toHaveLength(1)
    expect(result.content![0].type).toBe('paragraph')
  })
})
