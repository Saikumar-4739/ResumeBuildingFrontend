import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SaveOutlined,ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

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

  const setItemsToLocalStorage = (values: any) => {
    localStorage.setItem('academics', JSON.stringify(values));
    notification.success({
      message: 'Data Saved',
      description: 'Data saved locally. Click on the next page to continue.',
    });
    setIsSaved(true);
  };

  const handleNextSection = () => {
    if (isSaved) {
      navigate('/skills');
    } else {
      notification.warning({
        message: 'Data not saved',
        description: 'Please save the data before proceeding to the next section.',
      });
    }
  };

  const handlePreviousSection = () => {
    navigate('/experience');
  };

  const onFinish = (values: any) => {
    setItemsToLocalStorage(values);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="academics"
      onFinish={onFinish}
      initialValues={{ remember: true }}
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      <Form.Item
        label="Institution Name"
        name="institutionName"
        rules={[{ required: true, message: 'Please input your institution name!' }]}
      >
        <Input type='text' />
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
      <Button type="default" icon={<ArrowLeftOutlined />} onClick={handlePreviousSection} style={{ marginRight: '10px' }}>
          Previous Section
        </Button>
        <Button type="primary" icon={<SaveOutlined />} onClick={() => form.submit()} style={{ marginRight: '10px' }}>
          Save
        </Button>
        <Button type="default" icon={<ArrowRightOutlined />} onClick={handleNextSection}>
          Next Section
        </Button>
      </Form.Item>
    </Form>
  );
};
