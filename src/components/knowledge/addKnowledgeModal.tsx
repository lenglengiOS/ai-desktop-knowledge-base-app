import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Modal, Input, message } from "antd";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";
import * as KnowledgeActions from "../../store/actions/knowledgeAction";
import { useDispatch } from "react-redux/es";

interface IProps {
  ref?: any;
  content: string;
}
const AddKnowledgeModal: React.FC<IProps> = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const draggleRef = useRef<HTMLDivElement>(null!);

  useImperativeHandle(ref, () => ({
    showModal() {
      setOpen(true);
      let timer = setTimeout(() => {
        clearTimeout(timer);
        inputRef.current.focus(); // 调用focus方法聚焦输入框
      });
    },
  }));

  const handleOk = () => {
    let { content } = props;
    setOpen(false);
    messageApi.open({
      type: "success",
      content: "文章成功加入知识库，快去知识库看看吧！",
    });
    dispatch(
      KnowledgeActions.addKnowledgeAction({
        name,
        content,
      })
    );
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
  };

  const afterClose = () => {
    setOpen(false);
    setName("");
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={
          <div
            style={{ width: "100%", cursor: "move" }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            添加到知识库
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={afterClose}
        okButtonProps={{ disabled: !name }}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Input
          placeholder="请输入保存的名称"
          value={name}
          ref={inputRef}
          onChange={(e: any) => setName(e.target.value)}
          onPressEnter={() => name && handleOk()}
        />
      </Modal>
    </>
  );
});

export default AddKnowledgeModal;
