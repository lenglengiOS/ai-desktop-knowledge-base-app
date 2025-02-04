import { Sender, Bubble, BubbleProps } from "@ant-design/x";
import { App, Flex, message, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useState, FC, useEffect } from "react";
const { Text, Link } = Typography;
import OpenAI from "openai";
import MarkdownContent from "./markdownContent";

const client = new OpenAI({
  apiKey: "sk-cG6yn2hUq8rNDwPQ2X6o9t4xSMEWh5jHsRaMnQ5djjZpotEw",
  baseURL: "https://api.moonshot.cn/v1",
  dangerouslyAllowBrowser: true,
});

interface Iprops {}
const renderMarkdown: BubbleProps["messageRender"] = (content) => (
  <Typography
    style={{ textAlign: "left", maxHeight: "300px", overflowY: "scroll" }}
  >
    <MarkdownContent content={content} />
  </Typography>
);

const LHLSender: FC<Iprops> = () => {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [result, setResult] = useState<string>("");

  return (
    <Flex vertical gap="middle">
      <Bubble
        style={{ textAlign: "left" }}
        content={result}
        typing={{ step: 2, interval: 50 }}
        messageRender={renderMarkdown}
      />
      {/* {renderMarkdown(result)} */}
      <Sender
        loading={loading}
        value={value}
        placeholder="发消息、输入 @ 或 / 选择技能"
        onChange={(v) => {
          setValue(v);
        }}
        onSubmit={async (value: String) => {
          setValue("");

          const stream = await client.chat.completions.create({
            model: "moonshot-v1-8k",
            // if chat context is needed, modify the array
            messages: [{ role: "user", content: value }],
            // stream mode
            stream: true,
          });

          let temp_result: string = "";
          for await (const chunk of stream) {
            console.log("chunk: ", chunk);
            let cur = chunk.choices[0]?.delta?.content || "";

            temp_result += cur;
            // 传输结束
            if (chunk.choices[0]?.finish_reason === "stop") {
              console.log("加载完成：", temp_result);
            }
            setResult((r) => r + cur);
          }
        }}
        onCancel={() => {
          setLoading(false);
          message.error("Cancel seding!");
        }}
      />
    </Flex>
  );
};

export default LHLSender;
