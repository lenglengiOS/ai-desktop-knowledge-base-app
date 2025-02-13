import React, { FC, useState } from "react";
import { knowledgeItemType } from "../../store/reducers/knowledgeReducer";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { message } from "antd/es";

interface Iprops {
  item?: knowledgeItemType;
}

const LHLEidtKnowledgeDetail: FC<Iprops> = ({ item }) => {
  const [text, setText] = useState(item.content);

  const onSave = (content: string) => {
    // 执行保存逻辑
    message.success("保存成功");
  };

  return (
    <MdEditor
      toolbarsExclude={["github"]}
      showToolbarName={true}
      onSave={onSave}
      noUploadImg={true}
      codeFoldable={false}
      style={{ height: "100%" }}
      value={text}
      onChange={setText}
    />
  );
};

export default LHLEidtKnowledgeDetail;
