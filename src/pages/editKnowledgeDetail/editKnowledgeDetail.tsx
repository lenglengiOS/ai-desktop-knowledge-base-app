import React, { FC, useState } from "react";
import { knowledgeItemType } from "../../store/reducers/knowledgeReducer";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";

interface Iprops {
  item?: knowledgeItemType;
}

const LHLEidtKnowledgeDetail: FC<Iprops> = ({ item }) => {
  const [text, setText] = useState(item.content);

  return (
    <MdEditor style={{ height: "100%" }} value={text} onChange={setText} />
  );
};

export default LHLEidtKnowledgeDetail;
