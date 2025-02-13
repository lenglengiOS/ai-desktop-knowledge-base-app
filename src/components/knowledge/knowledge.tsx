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
  Button,
  Space,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
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
import { Welcome } from "@ant-design/x/es";
import LHLEidtKnowledgeDetail from "../../../src/pages/editKnowledgeDetail/editKnowledgeDetail";

interface Iprops {}

const LHLKnowledge: FC<Iprops> = () => {
  const { knowledgeList }: KnowledgeStateType = useSelector<ReducersType>(
    (state) => state.knowledge
  );
  const dispatch = useDispatch();
  // 详情抽屉
  const [isSeeDetailDrawerOpen, setSeeDetailDrawerOpen] = useState(false);
  // 编辑抽屉
  const [isEditDetailDrawerOpen, setEidtDetailDrawerOpen] = useState(false);
  const { width: windowWidth } = useWindowSize();
  const [openItem, setOpenItem] = useState(null);

  // 编辑
  const editDetail = (item: knowledgeItemType) => {
    setOpenItem(item);
    setEidtDetailDrawerOpen(true);
  };

  // 查看详情
  const seeDetail = (item: knowledgeItemType) => {
    setOpenItem(item);
    setSeeDetailDrawerOpen(true);
  };

  // 删除知识点
  const deleteKnowledge = (index: number) => {
    console.log(index);
    dispatch(deleteKnowledgeAction(index));
    message.success("删除成功");
  };

  // 抽屉关闭的回调
  const onDrawerClose = () => {
    setSeeDetailDrawerOpen(false);
    setEidtDetailDrawerOpen(false);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["list-con"]}>
        {/* 控提示 */}
        {knowledgeList.length === 0 && (
          <div className={styles["empty"]}>
            <Welcome
              variant="borderless"
              icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
              title="Hello，我是海豚AI助手！"
              description="这里是知识库，您的AI成果收纳箱，您现在还没有任何知识成果, 快去工作面板创作吧~"
            />
          </div>
        )}
        {/* 列表渲染 */}
        <Flex wrap gap="small">
          {knowledgeList.map((item: knowledgeItemType, index: number) => (
            <Card
              hoverable
              actions={[
                <EditOutlined key="edit" onClick={() => editDetail(item)} />,
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
      {/* 查看详情 */}
      <Drawer
        destroyOnClose
        width={windowWidth - 200}
        title={openItem?.name || ""}
        onClose={onDrawerClose}
        open={isSeeDetailDrawerOpen}
      >
        <KnowledgeDetail item={openItem} />
      </Drawer>
      {/* 编辑详情 */}
      <Drawer
        destroyOnClose
        width={windowWidth - 200}
        title={openItem?.name || ""}
        onClose={onDrawerClose}
        open={isEditDetailDrawerOpen}
      >
        <LHLEidtKnowledgeDetail item={openItem} />
      </Drawer>
    </div>
  );
};

export default LHLKnowledge;
