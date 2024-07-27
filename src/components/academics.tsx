// src/pages/AddAcademicsForm.tsx
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

export const AddAcademicsForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const storedAcademics = localStorage.getItem(`academics_${userId}`);
    if (storedAcademics) {
      form.setFieldsValue(JSON.parse(storedAcademics));
    }
  }, [form, userId]);

  const onFinish = async (values: any) => {
    try {
      const formattedValues = { ...values };
      const response = await axios.post('http://localhost:3023/academics/create', formattedValues);
      if (userId) {
        localStorage.setItem(`academics_${userId}`, JSON.stringify(formattedValues));
      }

      notification.success({
        message: 'Success',
        description: 'Academics submitted successfully!',
      });
      setIsSaved(true);

    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'There was an error creating the academics!',
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
      navigate('/skills');
    }
  };

  const handlePreviousSection = () => {
    navigate('/experience');
  };

  return (
    <Form
      {...layout}
      form={form}
      name="academics"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Institution Name"
        name="institutionName"
        rules={[{ required: true, message: 'Please input your institution name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Passing Year"
        name="passingYear"
        rules={[{ required: true, message: 'Please input your passing year!' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Qualification"
        name="qualification"
        rules={[{ required: true, message: 'Please input your qualification!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="University"
        name="university"
        rules={[{ required: true, message: 'Please input your university!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Percentage"
        name="percentage"
        rules={[{ required: true, message: 'Please input your percentage!' }]}
      >
        <Input type="number" />
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
