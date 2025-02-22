import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/index";
import { LHLSetting } from "./pages";
import Package from "../package.json";
import { SettingStateType } from "./store/reducers/settingReducer";
import "./app.css";

// 路由
import Home from "./pages/home/home";
import KnowledgeDetail from "./pages/knowledge/knowledgeDetail/knowledgeDetail";
import { ReducersType } from "./store/reducers";

const App = () => {
  useEffect(() => {
    // 读取并回显版本号
    const a = document.getElementById("title");
    a.innerHTML = `海豚AI助手（版本号：${Package.version}）`;
  }, []);

  const Page = () => {
    const { name, apiKey, baseURL, model }: SettingStateType =
      useSelector<ReducersType>((state) => state.setting);

    if (!apiKey || !baseURL || !model || !name) {
      return <LHLSetting />;
    }
    return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/knowledgeDetail" element={<KnowledgeDetail />} />
        </Routes>
      </HashRouter>
    );
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Page />
      </PersistGate>
    </Provider>
  );
};
// 获取专门的容器元素
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
