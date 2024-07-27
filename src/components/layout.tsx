// src/components/layout.tsx
import React, { useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import "./css/layout.css";

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentRoute = location.pathname;

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
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu theme="dark" mode="inline" selectedKeys={[currentRoute]}>
            <Menu.Item key="/user-form">
              <Link to="/user-form">User Form</Link>
            </Menu.Item>
            <Menu.Item key="/experience">
              <Link to="/experience">Experience</Link>
            </Menu.Item>
            <Menu.Item key="/academics">
              <Link to="/academics">Academics</Link>
            </Menu.Item>
            <Menu.Item key="/skills">
              <Link to="/skills">Skills</Link>
            </Menu.Item>
            <Menu.Item key="/personal-details">
              <Link to="/personal-details">Personal Details</Link>
            </Menu.Item>
            <Menu.Item key="/declaration">
              <Link to="/declaration">Declaration</Link> {/* Add Declaration link */}
            </Menu.Item>
            <Menu.Item key="/preview-resume">
              <Link to="/preview-resume">Preview Resume</Link>
            </Menu.Item>
            <Menu.Item key="/download-page">
              <Link to="/download-page">Download Resume</Link>
            </Menu.Item>
          </Menu>
        </Sider>
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
