// src/components/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';
import "./css/loginpage.css";

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const onFinishLogin = (values: any) => {
    setLoading(true);
    const { username, password } = values;

    // Dummy login validation
    if (username === 'dummy@example.com' && password === 'password') {
      localStorage.setItem('token', 'dummyToken'); // Store a dummy token in localStorage
      localStorage.setItem('email', username); // Store the email in localStorage
      navigate('/user-form'); // Redirect to user-form after login
    } else {
      alert('Invalid username or password');
      setLoading(false);
    }
  };

  const onFinishSignup = (values: any) => {
    setLoading(true);
    // Dummy signup process
    console.log('Signup values:', values);
    alert('Registration successful! Please log in.');
    setIsSignup(false);
    setLoading(false);
  };

  return (
    <div className="login-container">
      <Title level={2}>
        {isSignup ? 'User Signup' : 'User Login'}
      </Title>
      <Form
        name={isSignup ? "signup" : "login"}
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={isSignup ? onFinishSignup : onFinishLogin}
      >
        {isSignup && (
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        )}
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        {!isSignup && (
          <>
            <Text type="secondary">Username: dummy@example.com</Text>
            <br />
            <Text type="secondary">Password: password</Text>
          </>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
            {isSignup ? 'Sign up' : 'Log in'}
          </Button>
          {!isSignup && (
            <Button type="default" className="login-form-button" onClick={() => setIsSignup(true)}>
              Sign up
            </Button>
          )}
          {isSignup && (
            <Button type="default" className="login-form-button" onClick={() => setIsSignup(false)}>
              Back to Login
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
