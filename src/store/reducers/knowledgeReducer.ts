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
  console.log("知识库reducer88");
  const payload = action.payload;
  switch (action.type) {
    // 添加知识库
    case Types.ADD_KNOWLEDGE:
      console.log("知识库reducer");
      let knowledgeList = state.knowledgeList;
      // 以当前时间戳作为id
      let timestamp = new Date().getTime();
      // 获取当前时间
      const formattedTime = dayjs().format("YYYYMMDDHHmmss");
      const item: knowledgeItemType = {
        id: timestamp,
        name: payload.name,
        content: payload.content,
        createTime: formattedTime,
      };

      knowledgeList.push(item);
      return { ...state, knowledgeList };

    // 修改知识库
    // case Types.UPDATE_KNOWLEDGE:
    //   let tempMessages = state.messages;
    //   let length = tempMessages.length;
    //   tempMessages[length - 1] = payload;
    //   return { ...state, messages: tempMessages };

    default:
      return state;
  }
};

export default knowledgeReducer;
