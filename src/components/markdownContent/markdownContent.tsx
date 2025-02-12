import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import * as Theme from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

interface Iprops {
  content: string;
}
const MarkdownContent: FC<Iprops> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(item: any) {
          const { children, className, inline } = item;
          // 匹配否指定语言
          const match: any = /language-(\w+)/.exec(className || "");
          return (
            <>
              {match ? (
                <>
                  <div
                    style={{
                      width: "auto",
                      height: 30,
                      backgroundColor: "rgb(235,235,235)",
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: 16,
                      paddingRight: 16,
                    }}
                  >
                    <div>{match && match[1]}</div>
                  </div>
                  <SyntaxHighlighter
                    language={match && match[1]}
                    style={Theme.oneLight}
                    customStyle={{
                      backgroundColor: "rgb(248,249,250)",
                      margin: 0,
                      padding: 15,
                      border: "1px solid rgb(235,235,235)",
                      borderRadius: 0,
                    }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </>
              ) : (
                <code
                  className={className}
                  style={{
                    backgroundColor: "#EEE",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    margin: "0 4px",
                  }}
                >
                  {children}
                </code>
              )}
            </>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownContent;
