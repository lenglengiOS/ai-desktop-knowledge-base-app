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
import { PanelStateType } from "../../store/reducers/panelReducer";
import { Button, Flex, GetProp, Tooltip, message } from "antd/es";
import { CopyOutlined, FolderAddOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";
import AddKnowledgeModal from "../knowledge/addKnowledgeModal";
import { throttle } from "../../utils/common";
import MessageItem from "./messageItem";
import styles from "./panel.module.css";

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
        <Bubble.List
          roles={roles}
          autoScroll={true}
          style={{
            textAlign: "left",
          }}
          items={messages.map(
            ({ content, placement, createTime }: any, i: number) => {
              return {
                key: createTime,
                styles: {
                  content: {
                    backgroundColor:
                      placement === "start" ? "rgb(250,250,248)" : "#EFEFEF", // 设置气泡内容区域的背景色
                    padding: placement === "start" ? "10px" : 0, // 设置气泡内容区域的内边距
                    paddingLeft: "10px",
                    paddingRight: "10px",
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
                footer:
                  placement === "start" && !loading ? (
                    <BubbleFotter
                      content={content}
                      index={i}
                      loading={loading}
                    />
                  ) : null,
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

const BubbleFotter = React.memo(({ content, index, loading }: any) => {
  // 添加知识库的ref
  const addModalRef = useRef(null);

  const copyContent = () => {
    copy(content);
    message.success("已复制到粘贴板");
  };
  const add = () => {
    if (addModalRef.current) {
      addModalRef.current.showModal();
    }
  };

  return (
    <>
      <Flex>
        <Tooltip title="复制到粘贴板">
          <Button
            disabled={loading}
            onClick={copyContent}
            size="middle"
            type="text"
            icon={<CopyOutlined />}
          />
        </Tooltip>
        <Tooltip title="添加到知识库">
          <Button
            disabled={loading}
            onClick={add}
            size="middle"
            type="text"
            icon={<FolderAddOutlined />}
          />
        </Tooltip>
      </Flex>
      <AddKnowledgeModal ref={addModalRef} content={content} />
    </>
  );
});

export default LHLPanel;
