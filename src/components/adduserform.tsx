// src/pages/AddUserForm.tsx
import React, { useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const AddUserForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  const showModal = (title: string, content: string, type: 'success' | 'error') => {
    modal[type]({
      title,
      content,
    });
  };

  const onFinish = async (values: any) => {
    try {
      const userId = uuidv4();
      const formattedValues = {
        ...values,
        address: [
          {
            street: values.address.street,
            city: values.address.city,
            state: values.address.state,
            country: values.address.country,
            zipcode: values.address.zipcode,
          },
        ],
        userId: userId,
      };

      const response = await axios.post('http://localhost:3023/users/createUser', formattedValues);
      if (response.status === 201) {
        localStorage.setItem('userId', userId);
        localStorage.setItem(`user_${userId}`, JSON.stringify(formattedValues));

        setIsSaved(true);
        setIsButtonVisible(true);
        showModal('Success', 'User has been created successfully!', 'success');
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error: any) {
      setIsSaved(false);
      setIsButtonVisible(false);

      if (error.response) {
        const { data } = error.response;
        if (data.message === 'User with this email already exists') {
          showModal('Error', 'User with this email already exists', 'error');
        } else if (data.message === 'Address is missing or invalid') {
          showModal('Error', 'Address is missing or invalid', 'error');
        } else {
          showModal('Error', 'There was an error creating the user!', 'error');
        }
      } else {
        showModal('Error', 'There was an error creating the user!', 'error');
      }
    }
  };

  const handleNextSection = () => {
    if (isSaved) {
      navigate('/experience');
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Full Name"
          name="uname"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mobile Number"
          name="mobileNo"
          rules={[{ required: true, message: 'Please input your mobile number!' }]}
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item
          label="Street"
          name={['address', 'street']}
          rules={[{ required: true, message: 'Please input your street!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="City"
          name={['address', 'city']}
          rules={[{ required: true, message: 'Please input your city!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="State"
          name={['address', 'state']}
          rules={[{ required: true, message: 'Please input your state!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Country"
          name={['address', 'country']}
          rules={[{ required: true, message: 'Please input your country!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Zip Code"
          name={['address', 'zipcode']}
          rules={[{ required: true, message: 'Please input your zip code!' }]}
        >
          <Input type='number'/>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          {isButtonVisible && (
            <Button type="default" onClick={handleNextSection} style={{ marginLeft: '10px' }}>
              Next Section
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};
