import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import type { Components } from "react-markdown"

function AIResponse({ text }: { text: string }) {
  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "")

      if(match) {
        return (
          <SyntaxHighlighter
            style={oneDark}
            language={match[1]}
            PreTag="div"
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        )
      }
      return (
        <code className="bg-gray-800 px-1 rounded" {...props}>
          {children}
        </code>
      )
    },
    a({ href, children }) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline hover:text-blue-300"
        >
          {children}
        </a>
      )
    }
  }

  return (
    <div className="w-full h-fit justify-start flex">
      <div className="text-white text-md px-4 py-2 rounded-lg">
        <div className="markdown-body">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={components}
          >
            {text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default AIResponse