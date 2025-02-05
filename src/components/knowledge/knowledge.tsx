import React, { useState, FC } from "react";
import { Card, Col, Flex, Row, Slider, Drawer } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { ReducersType } from "../../../src/store/reducers";
import { PanelStateType } from "../../../src/store/reducers/panelReducer";
import {
  knowledgeItemType,
  KnowledgeStateType,
} from "../../../src/store/reducers/knowledgeReducer";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import KnowledgeDetail from "../../pages/knowledgeDetail/knowledgeDetail";
import { useWindowSize } from "../../../src/hooks/commonHooks";

interface Iprops {}

const LHLKnowledge: FC<Iprops> = () => {
  const { knowledgeList }: KnowledgeStateType = useSelector<ReducersType>(
    (state) => state.knowledge
  );
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { width: windowWidth } = useWindowSize();
  const [openItem, setOpenItem] = useState(null);

  const seeDetail = (item: knowledgeItemType) => {
    setOpenItem(item);
    setDrawerOpen(true);
  };

  // 抽屉关闭的回调
  const onDrawerClose = () => {
    setDrawerOpen(false);
  };

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
              hoverable
              actions={[
                <EditOutlined key="edit" />,
                <EyeOutlined key="see" onClick={() => seeDetail(item)} />,
                <DeleteOutlined key="delete" />,
              ]}
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
              <Meta style={{ marginTop: 12 }} description={item.createTime} />
            </Card>
          ))}
        </Flex>
      </div>
      <Drawer
        destroyOnClose
        width={windowWidth - 200}
        title={openItem?.name || ""}
        onClose={onDrawerClose}
        open={isDrawerOpen}
      >
        <KnowledgeDetail item={openItem} />
      </Drawer>
    </div>
  );
};

export default LHLKnowledge;
