import * as Types from "../constant/actionTypes";

type ActionType = { payload: any; type: String };

export type MessageItemType = {
  placement: "end" | "start";
  content: string;
  isFinish?: boolean;
};

export type PanelStateType = {
  messages?: MessageItemType[];
};

const initState: PanelStateType = {
  messages: [],
};

const panelReducer = (state = initState, action: ActionType) => {
  const payload = action.payload;
  switch (action.type) {
    // 添加消息
    case Types.ADD_MESSAGE:
      let messages = state.messages;
      return {
        ...state,
        messages: [...messages, { ...payload, createTime: Date.now() }],
      };

    // 更新消息
    case Types.UPDATE_MESSAGE:
      let { isFinish = false, content } = payload;
      // 如果isFinish=true,则截取最近50条数据
      let tempMessages = isFinish ? state.messages.slice(-50) : state.messages;
      let length = tempMessages.length;
      tempMessages[length - 1].content = content;
      tempMessages[length - 1].isFinish = isFinish;
      return { ...state, messages: tempMessages };

    default:
      return state;
  }
};

export default panelReducer;
