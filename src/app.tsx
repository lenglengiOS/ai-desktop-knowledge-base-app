import * as React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/index";
import "./app.css";

// 路由
import Home from "./pages/home/home";

function About() {
  return <h2>About Page111222</h2>;
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <React.StrictMode>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </HashRouter>
        </React.StrictMode>
      </PersistGate>
    </Provider>
  );
};
// 获取专门的容器元素
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
