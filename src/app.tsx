import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/index";
import Package from "../package.json";
import "./app.css";

// 路由
import Home from "./pages/home/home";
import KnowledgeDetail from "./pages/knowledgeDetail/knowledgeDetail";

const App = () => {
  useEffect(() => {
    // 读取并回显版本号
    const a = document.getElementById("title");
    a.innerHTML = `海豚AI助手（版本号：${Package.version}）`;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/knowledgeDetail" element={<KnowledgeDetail />} />
          </Routes>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
};
// 获取专门的容器元素
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
