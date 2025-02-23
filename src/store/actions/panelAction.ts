import { Dispatch } from "redux";
import * as Types from "../constant/actionTypes";
import { MessageItemType } from "../reducers/panelReducer";

// 添加消息
export const addMesssageAction: any = (message: MessageItemType) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Types.ADD_MESSAGE,
      payload: message,
    });
  };
};

// 更新消息
export const updateMesssageAction: any = (message: MessageItemType) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Types.UPDATE_MESSAGE,
      payload: message,
    });
  };
};

// 是否深度思考
export const changeDeepThinkAction: any = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Types.CHANGE_DEEPTHINK,
    });
  };
};

// 是否联网搜索
export const changeOnlineSearchAction: any = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Types.CHANGE_ONLINESEARCH,
    });
  };
};
