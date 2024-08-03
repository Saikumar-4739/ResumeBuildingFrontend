import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LeftOutlined, SaveOutlined, ArrowRightOutlined, EditOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface Experience {
  objective?: string;
  companyName: string;
  role: string;
  fromYear: string;
  toYear: string;
  description?: string;
}

export const ExperienceForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [experienceData, setExperienceData] = useState<Experience>({
    companyName: '',
    role: '',
    fromYear: '',
    toYear: ''
  });
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));
  const [loading, setLoading] = useState(false);
  const [isNewExperience, setIsNewExperience] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchExperienceData(userId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchExperienceData = async (userId: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:3023/experiences/${userId}`);
      if (response.data.data && response.data.data.length > 0) {
        const backendData: Experience = response.data.data[0];
        setExperienceData(backendData);
        setIsEditing(true);
        form.setFieldsValue(backendData);
        setIsNewExperience(false);
      } else {
        setIsEditing(false);
        setIsNewExperience(true);
      }
    } catch {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch experience data',
        className: 'custom-notification'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    navigate('/personal-details');
  };

  const handleNextSection = () => {
    if (isSaved) {
      navigate('/declaration');
    } else {
      notification.warning({
        message: 'Save your data first!',
        description: 'Please save your data before proceeding to the next section.',
        className: 'custom-notification',
      });
    }
  };

  const saveDataToBackend = async () => {
    try {
      const endpoint = isNewExperience ? `http://localhost:3023/experience/${userId}` : `http://localhost:3023/experiences/${userId}`;
      await axios.post(endpoint, experienceData);
      setIsSaved(true);
      notification.success({
        message: 'Success',
        description: `Experience data ${isNewExperience ? 'added' : 'updated'} successfully.`,
        className: 'custom-notification',
      });
    } catch {
      notification.error({
        message: 'Error',
        description: 'Failed to save experience data.',
        className: 'custom-notification',
      });
    }
  };

  const handleFormChange = (changedValues: any) => {
    setExperienceData(prevData => ({ ...prevData, ...changedValues }));
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Form
        {...layout}
        form={form}
        name="experience"
        style={{ maxWidth: '600px', margin: '0 auto' }}
        onValuesChange={handleFormChange}
        initialValues={experienceData}
      >
        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[{ required: true, message: 'Please input your company name!' }]}
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
          rules={[{ required: true, message: 'Please input your start year!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="To Year"
          name="toYear"
          rules={[{ required: true, message: 'Please input your end year!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="default"
            onClick={handlePrevious}
            icon={<LeftOutlined />}
            style={{ marginRight: '8px' }}
          >
            Previous Section
          </Button>
          <Button
            type="primary"
            onClick={saveDataToBackend}
            icon={isEditing ? <EditOutlined /> : <SaveOutlined />}
            style={{ marginRight: '8px' }}
            disabled={!isEditing && !isNewExperience}
          >
            {isEditing ? 'Update' : 'Save'}
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

export default ExperienceForm;
