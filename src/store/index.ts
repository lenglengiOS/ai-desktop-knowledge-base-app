import { legacy_createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
//  存储机制，可换localStorage, sessionStorage等，当前使用storage
import localStorage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import { createLogger } from "redux-logger";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { getPersistConfig } from "redux-deep-persist";

const initState = {};
const persistConfig = getPersistConfig({
  key: "root", // 必须有的
  storage: localStorage, // 缓存机制
  // @ts-ignore
  stateReconciler: autoMergeLevel2, // 查看 'Merge Process' 部分的具体情况
  whitelist:
    process.env.NODE_ENV === "development"
      ? ["panel.messages", "knowledge"]
      : ["panel.messages", "knowledge"],
  rootReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const loggerMiddleware = createLogger();

const store = legacy_createStore(
  persistedReducer,
  initState,
  compose(applyMiddleware(thunk, loggerMiddleware))
);

export const persistor = persistStore(store);

export default store;
