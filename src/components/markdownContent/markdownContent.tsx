import { Tooltip, Button, message } from "antd/es";
import React, { FC, useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import * as Theme from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { MdPreview } from "md-editor-rt";
import remarkToc from "remark-toc";
import rehypeRaw from "rehype-raw";
import Mermaid from "./mermaidCmp";
import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you

interface Iprops {
  content: string;
}

// 富文本预览组件，目前在使用
const MDContent: FC<Iprops> = ({ content }) => {
  return (
    <MdPreview
      style={{ backgroundColor: "transparent" }}
      value={content}
      codeFoldable={false}
      showCodeRowNumber={false}
    />
  );
};

export default MDContent;

// 自定义组件，暂时没有用
// const MarkdownContent: FC<Iprops> = ({ content }) => {
//   content = preprocessLaTeX(content);
//   const [isLight, setIsLignt] = useState<boolean>(true);
//   const copyContent = (children: string) => {
//     copy(children);
//     message.success("已复制到粘贴板");
//   };

//   const changeStyle = () => {
//     setIsLignt((pre) => !pre);
//   };

//   return (
//     <ReactMarkdown
//       children={content}
//       remarkPlugins={[
//         () => (tree: Root) => {
//           visit(tree, "code", (node) => {
//             node.lang = node.lang ?? "plaintext";
//           });
//         },
//         remarkMath,
//         remarkGfm,
//         remarkToc,
//       ]}
//       remarkRehypeOptions={{ passThrough: ["link"] }}
//       rehypePlugins={[rehypeKatex, rehypeRaw]}
//       components={{
//         code({ children, className }: any) {
//           // 匹配否指定语言
//           const match: any = /language-(\w+)/.exec(className || "");
//           const language = match ? match[1] : null;
//           if (language === "mermaid") {
//             return <Mermaid chart={children} />;
//           }
//           return (
//             <>
//               {match ? (
//                 <>
//                   <div
//                     style={{
//                       width: "auto",
//                       height: 30,
//                       backgroundColor: "rgb(235,235,235)",
//                       borderTopLeftRadius: 8,
//                       borderTopRightRadius: 8,
//                       display: "flex",
//                       alignItems: "center",
//                       paddingLeft: 16,
//                       paddingRight: 16,
//                     }}
//                   >
//                     <div style={{ marginRight: "auto" }}>{language}</div>
//                     <Tooltip title="复制到粘贴板">
//                       <Button
//                         onClick={() => copyContent(children)}
//                         size="middle"
//                         type="text"
//                         icon={<CopyOutlined />}
//                       />
//                     </Tooltip>
//                     <Tooltip title={isLight ? "黑暗模式" : "明亮模式"}>
//                       <Button
//                         onClick={changeStyle}
//                         size="middle"
//                         type="text"
//                         icon={isLight ? <SunOutlined /> : <MoonOutlined />}
//                       />
//                     </Tooltip>
//                   </div>
//                   <SyntaxHighlighter
//                     language={match && match[1]}
//                     style={isLight ? Theme.oneLight : Theme.vscDarkPlus}
//                     customStyle={{
//                       backgroundColor: isLight
//                         ? "rgb(248,249,250)"
//                         : "rgb(24,26,31)",
//                       margin: 0,
//                       padding: 15,
//                       border: "1px solid rgb(235,235,235)",
//                       borderRadius: 0,
//                       fontSize: 13,
//                     }}
//                   >
//                     {String(children).replace(/\n$/, "")}
//                   </SyntaxHighlighter>
//                 </>
//               ) : (
//                 <code
//                   className={className}
//                   style={{
//                     backgroundColor: "rgb(235,246,254)",
//                     padding: "2px 6px",
//                     borderRadius: "4px",
//                     margin: "0 4px",
//                     color: "rgb(53,148,247)",
//                   }}
//                 >
//                   {children}
//                 </code>
//               )}
//             </>
//           );
//         },
//       }}
//     />
//   );
// };

// const preprocessLaTeX = (content: string) => {
//   // Replace block-level LaTeX delimiters \[ \] with $$ $$

//   const blockProcessedContent = content.replace(
//     /\\\[(.*?)\\\]/gs,
//     (_, equation) => `$$${equation}$$`
//   );
//   // Replace inline LaTeX delimiters \( \) with $ $
//   const inlineProcessedContent = blockProcessedContent.replace(
//     /\\\((.*?)\\\)/gs,
//     (_, equation) => `$${equation}$`
//   );
//   return inlineProcessedContent;
// };
