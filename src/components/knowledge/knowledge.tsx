import React, { useState, FC } from "react";
import { Card, Col, Flex, Row, Slider } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../../../src/store/reducers";
import { PanelStateType } from "../../../src/store/reducers/panelReducer";
import {
  knowledgeItemType,
  KnowledgeStateType,
} from "../../../src/store/reducers/knowledgeReducer";

interface Iprops {}

const LHLKnowledge: FC<Iprops> = () => {
  const dispatch = useDispatch();
  const { knowledgeList }: KnowledgeStateType = useSelector<ReducersType>(
    (state) => state.knowledge
  );

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
      }}
    >
      <div
        style={{
          height: "100vh",
          flex: 1,
          display: "flex",
          overflow: "auto",
          padding: 24,
          alignItems: "start",
          backgroundColor: "rgb(240, 242, 245)",
        }}
      >
        <Flex wrap gap="small">
          {knowledgeList.map((item: knowledgeItemType, index: number) => (
            <Card
              actions={actions}
              style={{ width: 261 }}
              key={index.toString()}
              title={item.name}
              bordered={false}
            >
              <div
                style={{
                  height: 150,
                  overflowWrap: "break-word",
                  overflow: "hidden",
                }}
              >
                {item.content}
              </div>
            </Card>
          ))}
        </Flex>
      </div>
    </div>
  );
};

const actions: React.ReactNode[] = [
  <EditOutlined key="edit" />,
  <EyeOutlined key="see" />,
  <DeleteOutlined key="delete" />,
];

export default LHLKnowledge;
