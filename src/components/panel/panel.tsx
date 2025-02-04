import React, { useState, FC } from "react";
import { Bubble } from "@ant-design/x";
import { Footer } from "antd/es/layout/layout";
import LHLSender from "../../pages/home/components/sender";

interface Iprops {}

const LHLPanel: FC<Iprops> = () => {
  return (
    <div
      style={{
        padding: 24,
        flex: 1,
        display: "flex",
        backgroundColor: "red",
        flexDirection: "column",
      }}
    >
      <Bubble content="hello world !" />
      <Footer style={{ textAlign: "center", backgroundColor: "#FFF" }}>
        <LHLSender />
      </Footer>
    </div>
  );
};

export default LHLPanel;
