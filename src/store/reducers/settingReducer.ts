import * as Types from "../constant/actionTypes";
import { apiKey, baseURL, model, name } from "../../config/model.config.json";

type ActionType = { payload: any; type: String };

export type SettingStateType = {
  name?: string;
  apiKey?: string;
  baseURL?: string;
  model?: string;
};

const initState: SettingStateType = {
  name,
  apiKey,
  baseURL,
  model,
};

const settingReducer = (state = initState, action: ActionType) => {
  const payload = action.payload;
  switch (action.type) {
    // 保存模型配置
    case Types.UPDATE_SETTING:
      const { name, apiKey, baseURL, model } = payload;
      return { ...state, name, apiKey, baseURL, model };

    default:
      return state;
  }
};

export default settingReducer;
