import React, { FC } from "react";
import { knowledgeItemType } from "../../store/reducers/knowledgeReducer";
import { LHLMarkdownContent } from "../../components/index";

interface Iprops {
  item?: knowledgeItemType;
}

const LHLKnowledgeDetail: FC<Iprops> = ({ item }) => {
  return <LHLMarkdownContent content={item.content} />;
};

export default LHLKnowledgeDetail;
