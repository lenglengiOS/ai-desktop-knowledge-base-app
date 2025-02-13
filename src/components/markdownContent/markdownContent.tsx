import { Tooltip, Button, message } from "antd/es";
import React, { FC, useState } from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import * as Theme from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { CopyOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";

interface Iprops {
  content: string;
}
const MarkdownContent: FC<Iprops> = ({ content }) => {
  const [isLight, setIsLignt] = useState<boolean>(true);

  const copyContent = (children: string) => {
    copy(children);
    message.success("已复制到粘贴板");
  };

  const changeStyle = () => {
    setIsLignt((pre) => !pre);
  };

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
                    <div style={{ marginRight: "auto" }}>
                      {match && match[1]}
                    </div>
                    <Tooltip title="复制到粘贴板">
                      <Button
                        onClick={() => copyContent(children)}
                        size="middle"
                        type="text"
                        icon={<CopyOutlined />}
                      />
                    </Tooltip>
                    <Tooltip title={isLight ? "黑暗模式" : "明亮模式"}>
                      <Button
                        onClick={changeStyle}
                        size="middle"
                        type="text"
                        icon={isLight ? <SunOutlined /> : <MoonOutlined />}
                      />
                    </Tooltip>
                  </div>
                  <SyntaxHighlighter
                    language={match && match[1]}
                    style={isLight ? Theme.oneLight : Theme.vscDarkPlus}
                    customStyle={{
                      backgroundColor: isLight
                        ? "rgb(248,249,250)"
                        : "rgb(24,26,31)",
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
