import { Action } from "redux";
import * as Types from "../constant/actionTypes";
const dayjs = require("dayjs");

type ActionType = { payload: any; type: String };

export type knowledgeItemType = {
  id?: number;
  name: string;
  content: string;
  createTime?: string;
};

export type KnowledgeStateType = {
  knowledgeList?: knowledgeItemType[];
};

const initState: KnowledgeStateType = {
  knowledgeList: [],
};

const knowledgeReducer = (state = initState, action: ActionType) => {
  const payload = action.payload;
  let knowledgeList = state.knowledgeList;
  switch (action.type) {
    // 添加知识库
    case Types.ADD_KNOWLEDGE:
      // 以当前时间戳作为id
      let timestamp = new Date().getTime();
      // 获取当前时间
      const formattedTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      const item: knowledgeItemType = {
        id: timestamp,
        name: payload.name,
        content: payload.content,
        createTime: formattedTime,
      };

      knowledgeList.unshift(item);
      return { ...state, knowledgeList };

    // 删除指定下标的元素
    case Types.DELETE_KNOWLEDGE:
      knowledgeList.splice(payload.index, 1);
      return { ...state, knowledgeList };

    // 删除指定下标的元素
    case Types.UPDATE_KNOWLEDGE:
      knowledgeList[payload.index] = payload.knowledge;
      return {
        ...state,
        knowledgeList,
      };
    default:
      return state;
  }
};

export default knowledgeReducer;
