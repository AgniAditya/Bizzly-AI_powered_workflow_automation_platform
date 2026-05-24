import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function AIResponse({ text }: { text: string }) {
  return (
    <div className="w-full h-fit justify-start flex">
      <div className="text-white text-md px-4 py-2 rounded-lg">
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default AIResponse