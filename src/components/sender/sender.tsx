import { Sender, Bubble, BubbleProps } from "@ant-design/x";
import { App, Flex, message, Typography } from "antd";
import React, { useState, FC, useEffect } from "react";

interface Iprops {
  onSubmit?: (content: string) => void;
  onCancel?: () => void;
  loading: boolean;
}

const LHLSender: FC<Iprops> = ({ onSubmit, onCancel, loading }) => {
  const [value, setValue] = useState<string>("");
  return (
    <Flex vertical gap="middle">
      <Sender
        loading={loading}
        value={value}
        placeholder="发消息..."
        onChange={(v) => {
          setValue(v);
        }}
        onKeyPress={() => {}}
        onSubmit={async (content: string) => {
          setValue("");
          onSubmit && onSubmit(content.trim());
        }}
        onCancel={() => {
          onCancel && onCancel();
        }}
      />
    </Flex>
  );
};

export default LHLSender;
