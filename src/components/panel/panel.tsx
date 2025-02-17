import React, { useState, FC, useRef, useEffect, SyntheticEvent } from "react";
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
interface Iprops {}

let canAutoScrollToBottom = true;
const LHLPanel: FC<Iprops> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const chatListRef = useRef(null);
  const isProgrammaticScroll = useRef(false);

  const dispatch = useDispatch();
  const { messages }: PanelStateType = useSelector<ReducersType>(
    (state) => state.panel
  );

  useEffect(() => {
    scrollToBottom();
  }, []);

  const onUpdateMessage = throttle((message: string) => {
    // console.log("刷新", Date.now());
    dispatch(
      PanelActions.updateMesssageAction({
        placement: "start",
        content: message,
      })
    );
    scrollToBottom("smooth");
  }, 100);

  const onSubmit = async (content: string) => {
    canAutoScrollToBottom = true;
    // 第一步，把用户输入的消息存入Store
    let msg = {
      placement: "end",
      content,
    };
    dispatch(PanelActions.addMesssageAction(msg));
    await delay(50); // 延迟50毫秒，避免两次添加的时间重叠

    // 第二步，把ai返回的数据存入Store（此处延时2秒，等待页面更新）
    // 1、申请一个消息占位
    dispatch(
      PanelActions.addMesssageAction({
        placement: "start",
        content: "",
      })
    );

    const timer = setTimeout(() => {
      clearTimeout(timer);
      scrollToBottom("smooth");
    });

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
        const timer = setTimeout(() => {
          clearTimeout(timer);
          scrollToBottom("smooth");
        }, 100);
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
            isFinish: true,
          })
        );
      },
    });
  };

  const onCancel = async () => {
    setLoading(false);
    // 终止请求
    // console.log("终止请求: ", stream);
    stream.controller.abort();
  };

  // 滚动到底部方法
  const scrollToBottom = (behavior = "auto") => {
    if (!canAutoScrollToBottom) return;
    // console.log("scrollToBottom- ");
    const current = chatListRef?.current!;
    //scrollHeight是页面的高度
    if (current) {
      current.scrollTop = current.scrollHeight;
      current?.scrollIntoView({ behavior });
      isProgrammaticScroll.current = true; // 设置标志
    }
  };

  // 监听列表滚动
  const onMessageListScroll = (e: SyntheticEvent) => {
    if (!chatListRef?.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatListRef.current;
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 50;

    if (isProgrammaticScroll.current) {
      // console.log("代码触发的滚动");
      isProgrammaticScroll.current = false; // 重置标志
    } else {
      // console.log("用户触发的滚动");
      canAutoScrollToBottom = isNearBottom;
    }
  };

  return (
    <div className={styles["container"]}>
      <div
        className={styles["msg-con"]}
        ref={chatListRef}
        onScroll={onMessageListScroll}
      >
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
        {messages.map(
          ({ content, placement, createTime, isFinish }: any, i: number) => (
            <Bubble
              key={createTime}
              style={{
                textAlign: "left",
                paddingRight: 24,
              }}
              styles={{
                content: {
                  backgroundColor:
                    placement === "start" ? "rgb(250,250,248)" : "#EFEFEF", // 设置气泡内容区域的背景色
                  padding: 0,
                  marginBottom: 24,
                },
              }}
              // onTypingComplete={() =>
              //   i === messages.length - 1 && scrollToBottom("onTypingComplete")
              // }
              content={content}
              placement={placement}
              loading={placement === "start" && content === ""}
              messageRender={(content) => (
                <MessageItem content={content} index={i} />
              )}
              typing={
                placement === "start" && i === messages.length - 1 && !isFinish
                  ? { step: 2, interval: 50 }
                  : // ? { step: Math.floor(content.length / 8), interval: 40 }
                    false
              }
              footer={
                placement === "start" && (
                  <BubbleFotter content={content} index={i} loading={loading} />
                )
              }
              variant={placement === "start" ? "filled" : "shadow"}
            />
          )
        )}
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
