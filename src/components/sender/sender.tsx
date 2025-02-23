import { Sender, Bubble, BubbleProps } from "@ant-design/x";
import {
  App,
  Button,
  Flex,
  message,
  Typography,
  ConfigProvider,
  Space,
} from "antd";
import React, { useState, FC, useEffect } from "react";
import {
  AntDesignOutlined,
  ChromeOutlined,
  OpenAIOutlined,
} from "@ant-design/icons";
import { createStyles } from "antd-style";

interface Iprops {
  onSubmit?: (content: string) => void;
  onCancel?: () => void;
  loading: boolean;
}

type ButtonType = "dashed" | "link" | "default" | "text" | "primary";

const LHLSender: FC<Iprops> = ({ onSubmit, onCancel, loading }) => {
  const [value, setValue] = useState<string>("");
  const [thinkType, setThinkType] = useState<ButtonType>("dashed");
  const [netType, setNetType] = useState<ButtonType>("dashed");
  const { styles } = useStyle();

  const onThinkClick = () => {
    setThinkType((pre) => (pre === "dashed" ? "primary" : "dashed"));
  };

  const onNetClick = () => {
    setNetType((pre) => (pre === "dashed" ? "primary" : "dashed"));
  };

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
      <ConfigProvider
        button={{
          className: styles.linearGradientButton,
        }}
      >
        <Space>
          <Button
            onClick={onThinkClick}
            style={{ borderRadius: 16 }}
            size="middle"
            type={thinkType}
            icon={<OpenAIOutlined />}
          >
            深度思考
          </Button>
          <Button
            onClick={onNetClick}
            style={{ borderRadius: 16 }}
            icon={<ChromeOutlined />}
            type={netType}
            size="middle"
          >
            联网搜索
          </Button>
        </Space>
      </ConfigProvider>
    </Flex>
  );
};

export default LHLSender;

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));
