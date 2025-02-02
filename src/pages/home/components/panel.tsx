import React, { useState, FC } from "react";
import { Bubble } from "@ant-design/x";

interface Iprops {}

const LHLPanel: FC<Iprops> = () => {
  return (
    <div
      style={{
        padding: 24,
        flex: 1,
      }}
    >
      <Bubble content="hello world !" />
    </div>
  );
};

export default LHLPanel;
