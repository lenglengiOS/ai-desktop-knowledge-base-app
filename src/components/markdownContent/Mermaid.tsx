import React, { FC, useState, useRef, useEffect } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  securityLevel: "loose",
});

// // 开启调试模式
// mermaid.initialize({ logLevel: 1 });

// // 捕获解析错误
// mermaid.parseError = (err, hash) => {
//   console.error("Mermaid Error:", err);
// };

interface Iprops {
  chart: string;
}

const Mermaid: FC<Iprops> = ({ chart }) => {
  useEffect(() => {
    mermaid.contentLoaded();
  }, []);
  return (
    <div className="mermaid" style={{ textAlign: "center", overflow: "auto" }}>
      {chart}
    </div>
  );
};

export default Mermaid;
