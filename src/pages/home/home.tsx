import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
const { Content, Footer, Sider } = Layout;
import { LHLPanel, LHLDraft, LHLKnowledge } from "../../components/index";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("工作面板", "1", <PieChartOutlined />),
  // getItem("我的草稿", "2", <DesktopOutlined />),
  getItem("知识库", "3", <FileOutlined />),
];

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onSelect = (item: { key: React.SetStateAction<string> }) => {
    setKey(item.key);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          style={{ height: "100vh" }}
          defaultSelectedKeys={["1"]}
          mode="vertical"
          items={items}
          onSelect={onSelect}
        />
      </Sider>
      <Layout style={{ backgroundColor: "#FFF", height: "100vh" }}>
        <Content>
          {key === "1" && <LHLPanel />}
          {/* {key === "2" && <LHLDraft />} */}
          {key === "3" && <LHLKnowledge />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
