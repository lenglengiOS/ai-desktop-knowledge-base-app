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

// export const updateKnowledgeAction: any = (knowledge: knowledgeItemType) => {
//   return (dispatch: Dispatch) => {
//     dispatch({
//       type: Types.UPDATE_MESSAGE,
//       payload: knowledge,
//     });
//   };
// };
