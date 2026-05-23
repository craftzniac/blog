import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function CodeBlock({ children, className }: { children: string, className: string }) {
  const match = /language-(\w+)/.exec(className || "")
  return (
    <SyntaxHighlighter language={match?.[1]} style={materialOceanic}>
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  )
}
