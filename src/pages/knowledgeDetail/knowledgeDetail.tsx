import React, { useState, FC, useEffect } from "react";
import { Card, Col, Flex, Row, Slider } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../../store/reducers";
import { PanelStateType } from "../../store/reducers/panelReducer";
import {
  knowledgeItemType,
  KnowledgeStateType,
} from "../../store/reducers/knowledgeReducer";
import Meta from "antd/es/card/Meta";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import hljs from "highlight.js";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { coldarkCold } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { LHLMarkdownContent } from "../../components/index";

interface Iprops {
  item?: knowledgeItemType;
}

const LHLKnowledgeDetail: FC<Iprops> = ({ item }) => {
  return <LHLMarkdownContent content={item.content} />;
  return (
    <ReactMarkdown
      children={item.content}
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <CodeBlock
              language={match[1]}
              value={String(children).replace(/\n$/, "")}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};

const CodeBlock = ({ language, value }: any) => {
  return (
    <SyntaxHighlighter language={language} style={coldarkCold}>
      {value}
    </SyntaxHighlighter>
  );
};

export default LHLKnowledgeDetail;
