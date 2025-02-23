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
import { ButtonType } from "antd/es/button";
import { useDispatch, useSelector } from "react-redux";
import { PanelStateType } from "../../store/reducers/panelReducer";
import { ReducersType } from "../../store/reducers";
import {
  changeDeepThinkAction,
  changeOnlineSearchAction,
} from "../../store/actions/panelAction";

interface Iprops {
  onSubmit?: (content: string) => void;
  onCancel?: () => void;
  loading: boolean;
}

const LHLSender: FC<Iprops> = ({ onSubmit, onCancel, loading }) => {
  const [value, setValue] = useState<string>("");
  // const [thinkType, setThinkType] = useState<ButtonType>("dashed");
  // const [netType, setNetType] = useState<ButtonType>("dashed");
  const dispatch = useDispatch();
  const { isDeepThink, isOnlineSearch }: PanelStateType =
    useSelector<ReducersType>((state) => state.panel);

  const { styles } = useStyle();

  const onDeepThinkClick = () => {
    dispatch(changeDeepThinkAction());
  };

  const onOnlineSearchClick = () => {
    dispatch(changeOnlineSearchAction());
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
            onClick={onDeepThinkClick}
            style={{ borderRadius: 16 }}
            size="middle"
            type={isDeepThink ? "primary" : "dashed"}
            icon={<OpenAIOutlined />}
          >
            深度思考
          </Button>
          <Button
            onClick={onOnlineSearchClick}
            style={{ borderRadius: 16 }}
            icon={<ChromeOutlined />}
            type={isOnlineSearch ? "primary" : "dashed"}
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
