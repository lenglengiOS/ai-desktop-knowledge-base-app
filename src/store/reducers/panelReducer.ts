import * as Types from "../constant/actionTypes";

type ActionType = { payload: any; type: String };

export type MessageItemType = {
  placement: "end" | "start";
  content: string;
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
      messages.push(payload);
      return { ...state, messages };

    // 更新消息
    case Types.UPDATE_MESSAGE:
      let tempMessages = state.messages;
      let length = tempMessages.length;
      tempMessages[length - 1] = payload;
      return { ...state, messages: tempMessages };

    default:
      return state;
  }
};

export default panelReducer;
