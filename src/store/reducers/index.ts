import { combineReducers } from "redux";
import appReducer from "./appReducer";
import panelReducer, { PanelStateType } from "./panelReducer";
import knowledgeReducer, { KnowledgeStateType } from "./knowledgeReducer";
import settingReducer, { SettingStateType } from "./settingReducer";

export type ReducersType = {
  panel: PanelStateType;
  knowledge: KnowledgeStateType;
  setting: SettingStateType;
};

export default combineReducers<ReducersType>({
  panel: panelReducer,
  knowledge: knowledgeReducer,
  setting: settingReducer,
});
