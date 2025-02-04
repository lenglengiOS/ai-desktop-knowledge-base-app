import { Dispatch } from "redux";
import * as Types from "../constant/actionTypes";
import { MessageItemType } from "../reducers/panelReducer";

export const addMesssageAction: any = (message: MessageItemType) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Types.ADD_MESSAGE,
      payload: message,
    });
  };
};

export const updateMesssageAction: any = (message: MessageItemType) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Types.UPDATE_MESSAGE,
      payload: message,
    });
  };
};
