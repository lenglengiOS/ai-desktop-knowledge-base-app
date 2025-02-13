import React, { useState, FC } from "react";
import {
  Card,
  Col,
  Flex,
  Row,
  Slider,
  Drawer,
  Popconfirm,
  PopconfirmProps,
  message,
} from "antd";
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
import styles from "./knowledge.module.css";
import { deleteKnowledgeAction } from "../../../src/store/actions/knowledgeAction";

interface Iprops {}

const LHLKnowledge: FC<Iprops> = () => {
  const { knowledgeList }: KnowledgeStateType = useSelector<ReducersType>(
    (state) => state.knowledge
  );
  const dispatch = useDispatch();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { width: windowWidth } = useWindowSize();
  const [openItem, setOpenItem] = useState(null);

  // 查看详情
  const seeDetail = (item: knowledgeItemType) => {
    setOpenItem(item);
    setDrawerOpen(true);
  };

  // 删除知识点
  const deleteKnowledge = (index: number) => {
    console.log(index);
    dispatch(deleteKnowledgeAction(index));
    message.success("删除成功");
  };

  // 抽屉关闭的回调
  const onDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["list-con"]}>
        <Flex wrap gap="small">
          {knowledgeList.map((item: knowledgeItemType, index: number) => (
            <Card
              hoverable
              actions={[
                <EditOutlined key="edit" />,
                <EyeOutlined key="see" onClick={() => seeDetail(item)} />,
                <Popconfirm
                  title="提示"
                  description="确定要删除这个知识点吗？"
                  onConfirm={() => deleteKnowledge(index)}
                  okText="确定"
                  cancelText="取消"
                >
                  <DeleteOutlined key="delete" />
                </Popconfirm>,
              ]}
              style={{ width: 261 }}
              key={index.toString()}
              title={item.name}
              bordered={false}
            >
              <div className={styles["content"]}>{item.content}</div>
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
