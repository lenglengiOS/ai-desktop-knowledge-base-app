import { Dispatch } from "redux";
import * as Types from "../constant/actionTypes";
import { FieldType } from "../../pages/setting/setting";

export const updateConfigAction: any = (config: FieldType) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Types.UPDATE_SETTING,
      payload: config,
    });
  };
};
