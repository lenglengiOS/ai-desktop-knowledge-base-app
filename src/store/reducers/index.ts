import { combineReducers } from "redux";
import appReducer from "./appReducer";
import panelReducer, { PanelStateType } from "./panelReducer";

export type ReducersType = {
  panel: PanelStateType;
};

export default combineReducers<ReducersType>({
  panel: panelReducer,
});
