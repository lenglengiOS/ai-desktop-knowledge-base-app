import * as Types from "../constant/actionTypes";

type ActionType = { payload?: any; type: String };

export type MessageItemType = {
  placement: "end" | "start";
  content: string;
  isFinish?: boolean;
};

export type PanelStateType = {
  // 消息列表
  messages?: MessageItemType[];
  // 是否深度思考
  isDeepThink?: boolean;
  // 是否联网搜索
  isOnlineSearch?: boolean;
};

const initState: PanelStateType = {
  messages: [],
  isDeepThink: false,
  isOnlineSearch: false,
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

    // 是否深度思考
    case Types.CHANGE_DEEPTHINK:
      return { ...state, isDeepThink: !state.isDeepThink };

    // 是否联网搜索
    case Types.CHANGE_ONLINESEARCH:
      return { ...state, isOnlineSearch: !state.isOnlineSearch };

    default:
      return state;
  }
};

export default panelReducer;
