import React, { useState, FC, useRef, useEffect } from "react";
import { Bubble, BubbleProps } from "@ant-design/x";
import { Footer } from "antd/es/layout/layout";
import LHLSender from "../sender/sender";
import styles from "./panel.module.css";
import * as Request from "../../api/request";
import * as PanelActions from "../../store/actions/panelAction";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../../store/reducers";
import { MessageItemType } from "../../store/reducers/panelReducer";
import { GetProp, Typography } from "antd/es";
import MarkdownContent from "../markdownContent";
import { ChatCompletionChunk } from "openai/resources";
import { Stream } from "openai/streaming";

interface Iprops {}

const renderMarkdown: BubbleProps["messageRender"] = (content) => (
  <Typography style={{ textAlign: "left" }}>
    <MarkdownContent content={content} />
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
  const { messages } = useSelector<ReducersType>((state) => state.panel);

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

      onFinish: (message: string) => {
        console.log("结束： ");
        setLoading(false);
      },

      getStream: (st: any) => {
        stream = st;
        console.log("======stream=====", stream);
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
    <div
      style={{
        textAlign: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
              key: i,
              role: placement === "start" ? "ai" : "user",
              content,
              loading: placement === "start" && content === "",
              messageRender: item.placement === "end" ? null : renderMarkdown,
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

export default LHLPanel;
