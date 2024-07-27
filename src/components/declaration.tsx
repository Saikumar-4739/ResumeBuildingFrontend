// src/pages/DeclarationPage.tsx
import React from 'react';
import { Form, Input, DatePicker, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface DeclarationFormValues {
  date: string | null;
  place: string;
  description: string;
}

const DeclarationPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const onFinish = async (values: DeclarationFormValues) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const formattedValues = {
        ...values,
        date: values.date ? moment(values.date).format('YYYY-MM-DD') : null, // Convert Moment object to string
      };
      console.log('Values for API:', formattedValues);
      const response = await axios.post('http://localhost:3023/declarations/create', formattedValues);
      console.log('Response:', response.data);

      form.resetFields();
      message.success('Declaration created successfully');
    } catch (error) {
      console.error('There was an error creating the declaration!', error);
      setErrorMessage('Failed to create declaration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handlePrevious = () => {
    navigate('/personal-details');
  };

  const handleNext = () => {
    navigate('/preview-resume');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Form
        {...layout}
        form={form}
        name="declaration"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Please select the date!' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Place"
          name="place"
          rules={[{ required: true, message: 'Please input the place!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="default" onClick={handlePrevious}>
            Previous Section
          </Button>
          <Button type="primary" htmlType="submit" style={{ margin: '0 10px' }}>
            Save
          </Button>
          <Button type="default" onClick={handleNext}>
            Next Section
          </Button>
        </Form.Item>
      </Form>

      {loading && <div>Loading...</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default DeclarationPage;
