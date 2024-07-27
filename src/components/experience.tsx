// src/pages/AddExperienceForm.tsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const AddExperienceForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const storedExperience = localStorage.getItem(`experience_${userId}`);
    if (storedExperience) {
      form.setFieldsValue(JSON.parse(storedExperience));
    }
  }, [form, userId]);

  const onFinish = async (values: any) => {
    try {
      const formattedValues = { ...values };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post('http://localhost:3023/experiences/createExp', formattedValues);
      if (userId) {
        localStorage.setItem(`experience_${userId}`, JSON.stringify(formattedValues));
      }

      notification.success({
        message: 'Success',
        description: 'Experience submitted successfully!',
      });
      setIsSaved(true);

    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'There was an error creating the experience!',
      });
      setIsSaved(false);
    }
  };

  const handleSave = () => {
    form.submit();
  };

  const handleUpdate = () => {
    form.submit();
  };

  const handleNextSection = () => {
    if (isSaved) {
      navigate('/academics');
    }
  };

  const handlePreviousSection = () => {
    navigate('/user-form');
  };

  return (
    <Form
      {...layout}
      form={form}
      name="experience"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Objective"
        name="objective"
        rules={[{ required: true, message: 'Please input your objective!' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Company Name"
        name="companyName"
        rules={[{ required: true, message: 'Please input the company name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: 'Please input your role!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="From Year"
        name="fromYear"
        rules={[{ required: true, message: 'Please input the starting year!' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="To Year"
        name="toYear"
        rules={[{ required: true, message: 'Please input the ending year!' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={handleSave} style={{ marginRight: '10px' }}>
          Save
        </Button>
        <Button type="default" onClick={handleUpdate} style={{ marginRight: '10px' }}>
          Update
        </Button>
        <Button type="default" onClick={handlePreviousSection} style={{ marginRight: '10px' }}>
          Previous Section
        </Button>
        <Button type="default" onClick={handleNextSection}>
          Next Section
        </Button>
      </Form.Item>
    </Form>
  );
};
