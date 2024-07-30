import React, { useState } from 'react';
import { Form, Input, Button, message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SaveOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 7, span: 50 },
  };

export const DeclarationPage: React.FC = () => {
  const [form] = Form.useForm();
  const [declaration, setDeclaration] = useState('');
  const [place, setPlace] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    localStorage.setItem('declaration', declaration);
    localStorage.setItem('place', place);
    message.success('Data saved successfully');
    setIsSaved(true);
  };

  const handlePrevious = () => {
    navigate('/personal-details');
  };

  const handleNextSection = () => {
    if (isSaved) {
      navigate('/academics');
    } else {
      notification.warning({
        message: 'Save your data first!',
        description: 'Please save your data before proceeding to the next section.',
      });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Form
        {...layout}
        form={form}
        name="declaration"
        onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <Form.Item
          label="Declaration"
          name="declaration"
          rules={[{ required: true, message: 'Please input the declaration!' }]}
        >
          <Input.TextArea
            rows={4}
            value={declaration}
            onChange={(event) => setDeclaration(event.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Place"
          name="place"
          rules={[{ required: true, message: 'Please input the place!' }]}
        >
          <Input
            value={place}
            onChange={(event) => setPlace(event.target.value)}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="default"
            onClick={handlePrevious}
            icon={<ArrowLeftOutlined />}
            style={{ marginRight: '10px' }}
          >
            Previous Section
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSave}
            icon={<SaveOutlined />}
            style={{ margin: '0 10px' }}
          >
            Save
          </Button>
          <Button
            type="default"
            onClick={handleNextSection}
            icon={<ArrowRightOutlined />}
          >
            Next Section
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
