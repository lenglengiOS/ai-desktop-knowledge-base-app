import { Dispatch } from "redux";
import * as Types from "../constant/actionTypes";
import { MessageItemType } from "../reducers/panelReducer";
import { knowledgeItemType } from "../reducers/knowledgeReducer";

export const addKnowledgeAction: any = (knowledge: knowledgeItemType) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Types.ADD_KNOWLEDGE,
      payload: knowledge,
    });
  };
};

export const deleteKnowledgeAction: any = (index: number) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Types.DELETE_KNOWLEDGE,
      payload: { index },
    });
  };
};
