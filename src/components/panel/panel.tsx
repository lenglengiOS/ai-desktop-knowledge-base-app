import React, { useState, FC } from "react";
import { Bubble, Welcome } from "@ant-design/x";
import { Footer } from "antd/es/layout/layout";
import LHLSender from "../sender/sender";
import * as Request from "../../api/request";
import * as PanelActions from "../../store/actions/panelAction";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../../store/reducers";
import { PanelStateType } from "../../store/reducers/panelReducer";
import { GetProp, message } from "antd/es";
import { throttle, delay } from "../../utils/common";
import MessageItem from "./messageItem";
import styles from "./panel.module.css";
import BubbleFotter from "./bubbleFotter";

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

interface Iprops {}
const LHLPanel: FC<Iprops> = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { messages }: PanelStateType = useSelector<ReducersType>(
    (state) => state.panel
  );

  const onUpdateMessage = throttle((message: string) => {
    dispatch(
      PanelActions.updateMesssageAction({
        placement: "start",
        content: message,
      })
    );
  }, 500);

  const onSubmit = (content: string) => {
    // 第一步，把用户输入的消息存入Store
    let msg = {
      placement: "end",
      content,
    };
    dispatch(PanelActions.addMesssageAction(msg));

    // 第二步，把ai返回的数据存入Store（此处延时2秒，等待页面更新）
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
        onUpdateMessage(message);
      },

      onFinish: (message: string) => {
        setLoading(false);
        dispatch(
          PanelActions.updateMesssageAction({
            placement: "start",
            content: message,
            isFinish: true,
          })
        );
      },

      // 记录stream，用于终止流式请求
      getStream: (st: any) => {
        stream = st;
      },

      onError: (err) => {
        message.error(err);
        setLoading(false);
        // 显示错误消息
        dispatch(
          PanelActions.updateMesssageAction({
            placement: "start",
            content: "网络繁忙，请稍后再试",
          })
        );
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
    <div className={styles["container"]}>
      <div className={styles["msg-con"]}>
        {messages.length === 0 && (
          <div className={styles["empty"]}>
            <Welcome
              variant="borderless"
              icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
              title="Hello，我是海豚AI助手！"
              description="这里是您的创作区域，您只需要向我说明需求，AI会自动给您生成方案~"
            />
          </div>
        )}
        <Bubble.List
          roles={roles}
          autoScroll={true}
          style={{
            textAlign: "left",
            paddingRight: 24,
          }}
          items={messages.map(
            ({ content, placement, createTime }: any, i: number) => {
              return {
                key: createTime,
                styles: {
                  content: {
                    backgroundColor:
                      placement === "start" ? "rgb(250,250,248)" : "#EFEFEF", // 设置气泡内容区域的背景色
                    padding: 0, // 设置气泡内容区域的内边距
                  },
                },
                content,
                role: placement === "start" ? "ai" : "user",
                loading: placement === "start" && content === "",
                // messageRender: (content) => renderMarkdown(content),
                messageRender: (content) => (
                  <MessageItem content={content} index={i} />
                ),
                typing:
                  placement === "start"
                    ? { step: Math.floor(content.length / 8), interval: 20 }
                    : false,
                footer: placement === "start" && (
                  <BubbleFotter content={content} index={i} loading={loading} />
                ),
                variant: placement === "start" ? "filled" : "shadow",
              };
            }
          )}
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
