import { combineReducers } from "redux";
import appReducer from "./appReducer";
import panelReducer, { PanelStateType } from "./panelReducer";
import knowledgeReducer, { KnowledgeStateType } from "./knowledgeReducer";

export type ReducersType = {
  panel: PanelStateType;
  knowledge: KnowledgeStateType;
};

export default combineReducers<ReducersType>({
  panel: panelReducer,
  knowledge: knowledgeReducer,
});
