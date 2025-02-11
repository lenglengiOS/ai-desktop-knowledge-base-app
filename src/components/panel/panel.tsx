import React, {
  useState,
  FC,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Bubble, BubbleProps } from "@ant-design/x";
import { Footer } from "antd/es/layout/layout";
import LHLSender from "../sender/sender";
import * as Request from "../../api/request";
import * as PanelActions from "../../store/actions/panelAction";
import * as KnowledgeActions from "../../store/actions/knowledgeAction";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../../store/reducers";
import {
  MessageItemType,
  PanelStateType,
} from "../../store/reducers/panelReducer";
import { Button, Flex, GetProp, Tooltip, Typography, message } from "antd/es";
import { LHLMarkdownContent } from "../../components/index";
import { ChatCompletionChunk } from "openai/resources";
import { Stream } from "openai/streaming";
import {
  CopyOutlined,
  FolderAddOutlined,
  FrownOutlined,
  SmileOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons";
import copy from "copy-to-clipboard";
import AddKnowledgeModal from "../knowledge/addKnowledgeModal";
import styles from "./panel.module.css";

interface Iprops {}

const renderMarkdown: BubbleProps["messageRender"] = (content) => (
  <Typography style={{ textAlign: "left" }}>
    <LHLMarkdownContent content={content} />
  </Typography>
);

let stream: any;

const roles: GetProp<typeof Bubble.List, "roles"> = {
  ai: {
    placement: "start",
    typing: { step: 5, interval: 20 },
  },
  user: {
    placement: "end",
  },
};

const LHLPanel: FC<Iprops> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { messages }: PanelStateType = useSelector<ReducersType>(
    (state) => state.panel
  );

  const onSubmit = (content: string) => {
    // 第一步，把用户输入的消息存入Store
    let msg = {
      placement: "end",
      content,
    };
    dispatch(PanelActions.addMesssageAction(msg));

    // 第二步，把ai返回的数据存入Store
    // 1、申请一个消息占位
    dispatch(
      PanelActions.addMesssageAction({
        placement: "start",
        content: "",
      })
    );

    // 2、更新消息
    setLoading(true);
    Request.chat({
      content,
      onUpdate: (message: string) => {
        console.log("更新： ", message);
        dispatch(
          PanelActions.updateMesssageAction({
            placement: "start",
            content: message,
          })
        );
      },

      onFinish: () => {
        console.log("结束： ");
        setLoading(false);
      },

      getStream: (st: any) => {
        stream = st;
      },
    });
  };

  const onCancel = async () => {
    setLoading(false);
    // 终止请求
    console.log("终止请求: ", stream);
    stream.controller.abort();
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          textAlign: "center",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          padding: 24,
        }}
      >
        <Bubble.List
          roles={roles}
          style={{ textAlign: "left", marginBottom: 24 }}
          items={messages.map((item: any, i: number) => {
            const { content, placement } = item;
            return {
              key: i.toString(),
              role: placement === "start" ? "ai" : "user",
              content,
              loading: placement === "start" && content === "",
              messageRender: placement === "end" ? null : renderMarkdown,
              footer:
                placement === "start" && !loading ? (
                  <BubbleFotter content={content} />
                ) : null,
              variant: placement === "start" ? "filled" : "shadow",
            };
          })}
        />
      </div>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#FFF",
        }}
      >
        <LHLSender onSubmit={onSubmit} loading={loading} onCancel={onCancel} />
      </Footer>
    </div>
  );
};

const BubbleFotter = ({ content }: any) => {
  // const [messageApi, contextHolder] = message.useMessage();
  const childRef = useRef(null);

  const copyContent = () => {
    copy(content);
    message.success("已复制到粘贴板");
  };
  const add = () => {
    if (childRef.current) {
      childRef.current.showModal();
    }
  };

  return (
    <>
      <Flex>
        <Tooltip title="复制到粘贴板">
          <Button
            onClick={copyContent}
            size="middle"
            type="text"
            icon={<CopyOutlined />}
          />
        </Tooltip>
        <Tooltip title="添加到知识库">
          <Button
            onClick={add}
            size="middle"
            type="text"
            icon={<FolderAddOutlined />}
          />
        </Tooltip>
      </Flex>
      <AddKnowledgeModal ref={childRef} content={content} />
    </>
  );
};

export default LHLPanel;
