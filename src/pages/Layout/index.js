import "./index.scss";
import { Layout, Menu, message, Popconfirm } from "antd";
import {
  DiffOutlined,
  EditOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "@ant-design/v5-patch-for-react-19";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { fetchUserInfo, clearUserInfo } from "@/store/modules/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const GeekLayout = () => {
  const { Header, Sider } = Layout;
  const navigate = useNavigate();
  const dispathch = useDispatch();

  //获取登录用户名
  const name = useSelector((state) => state.user.userInfo.name);

  //获取登录用户信息
  useEffect(() => {
    dispathch(fetchUserInfo());
  }, [dispathch]);

  //退出确认
  const onConfirm = () => {
    dispathch(clearUserInfo());
    navigate("/login");
    message.success("退出成功");
  };

  //点侧边栏切换
  const onMenuClick = (value) => {
    const path = value.key;
    navigate(path);
  };

  //反响高亮
  const location = useLocation();
  const selectedKeys = location.pathname;

  const items = [
    { key: "/", label: "首页", icon: <HomeOutlined /> },
    { key: "/article", label: "文章管理", icon: <DiffOutlined /> },
    { key: "/publish", label: "创建文章", icon: <EditOutlined /> },
  ];
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            退出
            <Popconfirm
              title="退出登录"
              description="确认要退出登录吗？"
              onConfirm={onConfirm}
              okText="退出"
              cancelText="取消"
            >
              <LogoutOutlined />
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        {/* 侧边栏 */}
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            onClick={onMenuClick}
            items={items}
            selectedKeys={selectedKeys}
            style={{ height: "100%", borderRight: 0 }}
          ></Menu>
        </Sider>
        {/* 二级路由出口 */}
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;
