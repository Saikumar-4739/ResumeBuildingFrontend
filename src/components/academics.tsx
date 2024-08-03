import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SaveOutlined, ArrowLeftOutlined, ArrowRightOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface Academics {
  institutionName: string;
  passingYear: number;
  qualification: string;
  university: string;
  percentage: number;
}

export const AddAcademicsForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isSaved, setIsSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [academics, setAcademics] = useState<Academics>({
    institutionName: '',
    passingYear: 0,
    qualification: '',
    university: '',
    percentage: 0
  });
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchAcademicData(userId);
    }
  }, [userId]);

  const fetchAcademicData = async (userId: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:3023/academics/${userId}`);
      const backendData: Academics = response.data.data[0];
      setAcademics(backendData);
      form.setFieldsValue(backendData);
      setIsEditing(true);
    } catch {
      notification.warning({
        message: 'Error',
        description: 'Failed to fetch academics data',
        className: 'custom-notification'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateDataInBackend = async () => {
    if (!userId) {
      notification.error({
        message: 'Error',
        description: 'User ID not found. Please make sure you have saved user details.',
      });
      return;
    }

    const data = { userId, ...academics };

    try {
      await axios.put('http://localhost:3023/academics/update', data);
      notification.success({
        message: 'Success',
        description: 'Data updated successfully! Click on Next Section.',
      });
      setIsEditing(false);
      setIsSaved(true);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update data. Please try again.',
      });
    }
  };

  const handleNextSection = () => {
    if (isSaved) {
      navigate('/skills');
    } else {
      notification.warning({
        message: 'Save your data first!',
        description: 'Please save the details before proceeding to the next section.',
      });
    }
  };

  const handlePreviousSection = () => {
    navigate('/experience');
  };

  const handleSaveOrUpdate = () => {
    if (isEditing) {
      updateDataInBackend();
    } else {
      saveDataToBackend();
    }
  };

  const saveDataToBackend = async () => {
    if (!userId) {
      notification.error({
        message: 'Error',
        description: 'User ID not found. Please make sure you have saved user details.',
      });
      return;
    }

    const data = { userId, ...academics };

    try {
      await axios.post('http://localhost:3023/academics/create', data);
      notification.success({
        message: 'Success',
        description: 'Data saved successfully!',
      });
      setIsSaved(true);
      setIsEditing(false);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to save data. Please try again.',
      });
    }
  };

  const handleFieldChange = (field: keyof Academics, value: any) => {
    setAcademics(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Form
      {...layout}
      form={form}
      name="academics"
      initialValues={{ remember: true }}
    >
      <Form.Item
        label="Institution Name"
        name="institutionName"
        rules={[{ required: true, message: 'Please input your institution name!' }]}
      >
        <Input
          value={academics.institutionName}
          onChange={(event) => handleFieldChange('institutionName', event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Passing Year"
        name="passingYear"
        rules={[{ required: true, message: 'Please input your passing year!' }]}
      >
        <Input
          type="number"
          value={academics.passingYear}
          onChange={(event) => handleFieldChange('passingYear', Number(event.target.value))}
        />
      </Form.Item>

      <Form.Item
        label="Qualification"
        name="qualification"
        rules={[{ required: true, message: 'Please input your qualification!' }]}
      >
        <Input
          value={academics.qualification}
          onChange={(event) => handleFieldChange('qualification', event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="University"
        name="university"
        rules={[{ required: true, message: 'Please input your university!' }]}
      >
        <Input
          value={academics.university}
          onChange={(event) => handleFieldChange('university', event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Percentage"
        name="percentage"
        rules={[{ required: true, message: 'Please input your percentage!' }]}
      >
        <Input
          type="number"
          value={academics.percentage}
          onChange={(event) => handleFieldChange('percentage', Number(event.target.value))}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          type="default"
          onClick={handlePreviousSection}
          icon={<ArrowLeftOutlined />}
          style={{ marginRight: '10px' }}
        >
          Previous Section
        </Button>
        {isSaved ? (
          <Button
            type="primary"
            onClick={() => setIsEditing(true)}
            icon={<EditOutlined />}
            style={{ marginRight: '10px' }}
          >
            Edit
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={handleSaveOrUpdate}
            icon={<SaveOutlined />}
            style={{ marginRight: '10px' }}
          >
            Save
          </Button>
        )}
        <Button
          type="default"
          onClick={handleNextSection}
          icon={<ArrowRightOutlined />}
        >
          Next Section
        </Button>
      </Form.Item>
    </Form>
  );
};
