import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Drawer, Grid } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  UserOutlined,
  AppstoreAddOutlined,
  FileTextOutlined,
  BookOutlined,
  SmileOutlined,
  FileDoneOutlined,
  EyeOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import "./css/layout.css";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const currentRoute = location.pathname;
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('token');

    if (!isLoggedIn && currentRoute !== '/login') {
      navigate('/login');
    }

    if (isLoggedIn && currentRoute === '/login') {
      navigate('/user-form');
    }
  }, [currentRoute, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const menuItems = (
    <Menu theme="light" mode="inline" selectedKeys={[currentRoute]}>
      <Menu.Item key="/user-form" icon={<UserOutlined />}>
        <Link to="/user-form">User Form</Link>
      </Menu.Item>
      <Menu.Item key="/experience" icon={<AppstoreAddOutlined />}>
        <Link to="/experience">Experience</Link>
      </Menu.Item>
      <Menu.Item key="/academics" icon={<BookOutlined />}>
        <Link to="/academics">Academics</Link>
      </Menu.Item>
      <Menu.Item key="/skills" icon={<SmileOutlined />}>
        <Link to="/skills">Skills</Link>
      </Menu.Item>
      <Menu.Item key="/personal-details" icon={<FileDoneOutlined />}>
        <Link to="/personal-details">Personal Details</Link>
      </Menu.Item>
      <Menu.Item key="/declaration" icon={<FileTextOutlined />}>
        <Link to="/declaration">Declaration</Link>
      </Menu.Item>
      <Menu.Item key="/preview-resume" icon={<EyeOutlined />}>
        <Link to="/preview-resume">Preview Resume</Link>
      </Menu.Item>
      <Menu.Item key="/download-page" icon={<DownloadOutlined />}>
        <Link to="/download-page">Download Resume</Link>
      </Menu.Item>
    </Menu>
  );

  if (currentRoute === '/login') {
    return <Outlet />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="logo">Resume Generator</div>
        <div className="header-right">
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
          {!screens.md && (
            <Button type="primary" onClick={toggleDrawer} style={{ marginLeft: '1rem' }}>
              Menu
            </Button>
          )}
        </div>
      </Header>
      <Layout>
        {screens.md ? (
          <Sider width={200} className="site-layout-background" style={{ background: '#fff' }}>
            {menuItems}
          </Sider>
        ) : (
          <Drawer
            title="Menu"
            placement="left"
            closable
            onClose={toggleDrawer}
            visible={drawerVisible}
            bodyStyle={{ padding: 0 }}
          >
            {menuItems}
          </Drawer>
        )}
        <Layout style={{ padding: '0 24px', minHeight: 280 }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
