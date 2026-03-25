import { Streamdown } from 'streamdown'

export function MarkdownContent({ content, streaming = false, loading = false }) {
  return (
    <Streamdown
      controls={false}
      lineNumbers={false}
      mode={streaming ? 'streaming' : 'static'}
      parseIncompleteMarkdown={streaming}
      isAnimating={streaming && loading}
      skipHtml
    >
      {content}
    </Streamdown>
  )
}
