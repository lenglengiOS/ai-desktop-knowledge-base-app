import React, { FC, useEffect, useState } from "react";
import { knowledgeItemType } from "../../../store/reducers/knowledgeReducer";
import { MdEditor, ToolbarNames } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { Drawer, Input, message } from "antd/es";
import { useWindowSize } from "../../../../src/hooks/commonHooks";
import { useDispatch } from "react-redux/es";
import { updateKnowledgeAction } from "../../../../src/store/actions/knowledgeAction";
import { ExportPDF } from "@vavt/rt-extension";
// All CSS for this extension library
// import '@vavt/rt-extension/lib/asset/style.css';
// Or individual style for Emoji
import "@vavt/rt-extension/lib/asset/ExportPDF.css";

const toolbars: Array<ToolbarNames> = [
  "bold",
  "underline",
  "italic",
  "-",
  "strikeThrough",
  "sub",
  "sup",
  "quote",
  "unorderedList",
  "orderedList",
  "task",
  "-",
  "codeRow",
  "code",
  "image",
  "table",
  "mermaid",
  "katex",
  "-",
  "revoke",
  "next",
  "save",
  0,
  "=",
  "preview",
  "htmlPreview",
  "catalog",
];

interface Iprops {
  item?: knowledgeItemType;
  isEditDetailDrawerOpen?: boolean;
  onDrawerClose: () => void;
  index: number;
}

const LHLEidtKnowledgeDetail: FC<Iprops> = ({
  item,
  isEditDetailDrawerOpen,
  onDrawerClose,
  index,
}) => {
  const [text, setText] = useState<string>(item?.content || "");
  const [name, setName] = useState<string>(item?.name || "");
  const { width: windowWidth } = useWindowSize();
  const dispatch = useDispatch();

  useEffect(() => {
    setText(item?.content || "");
    setName(item?.name || "");
  }, [item]);

  const onSave = (content: string) => {
    if (!name) {
      message.warning("请输入标题");
      return;
    }
    if (!content) {
      message.warning("请输入内容");
      return;
    }
    const data = {
      index,
      knowledge: {
        name,
        content,
      },
    };
    dispatch(updateKnowledgeAction(data));
    // 执行保存逻辑
    message.success("保存成功");
  };

  const onTitleChange = (e: any) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  const onClose = () => {
    setText("");
    onDrawerClose && onDrawerClose();
  };

  const onError = (err: any) => {
    message.error(err.message);
  };

  return (
    <Drawer
      keyboard={false}
      destroyOnClose
      width={windowWidth - 200}
      title={
        <Input value={name} placeholder="请输入标题" onChange={onTitleChange} />
      }
      onClose={onClose}
      open={isEditDetailDrawerOpen}
    >
      <MdEditor
        autoFocus
        onError={onError}
        showToolbarName={true}
        onSave={onSave}
        noUploadImg={true}
        codeFoldable={false}
        style={{ height: "100%" }}
        value={text}
        onChange={setText}
        toolbars={toolbars}
        defToolbars={[
          <ExportPDF key="ExportPDF" value={text} fileName={name} />,
        ]}
      />
    </Drawer>
  );
};

export default LHLEidtKnowledgeDetail;
