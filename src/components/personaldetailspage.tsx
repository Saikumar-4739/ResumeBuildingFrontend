import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined, SaveOutlined, ArrowRightOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface PersonalDetails {
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  maritalStatus: string;
  languagesKnown: string;
}

export const PersonalDetailsForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    maritalStatus: '',
    languagesKnown: '',
  });
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));

  useEffect(() => {
    if (userId) {
      fetchPersonalDetails(userId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchPersonalDetails = async (userId: string) => {
    try {
      const response = await axios.post(`http://localhost:3023/personal-details/${userId}`);
      const backendData: PersonalDetails = response.data.data[0];
      const updatedData: PersonalDetails = {
        fatherName: backendData.fatherName,
        motherName: backendData.motherName,
        dateOfBirth: backendData.dateOfBirth,
        maritalStatus: backendData.maritalStatus,
        languagesKnown: backendData.languagesKnown,
      };


  console.log(response);

      

      setPersonalDetails(updatedData);
      setIsEditing(true);
      form.setFieldsValue(updatedData);
    } catch {
      notification.error({
        message: 'Error',
        description: 'Failed to retrieve personal details.',
        className: 'custom-notification',
      });
    }
  };

  const saveDataToBackend = async () => {
    if (!userId) {
      notification.error({
        message: 'Error',
        description: 'User ID not found. Please make sure you have saved user details.',
        className: 'custom-notification',
      });
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:3023/personal-details/update/${userId}`, personalDetails);
        notification.success({
          message: 'Data Updated',
          description: 'Data has been updated successfully. Click on Next Section to proceed.',
          className: 'custom-notification',
        });
      } else {
        await axios.post('http://localhost:3023/personal-details/create', personalDetails);
        notification.success({
          message: 'Data Saved',
          description: 'Data has been saved successfully. Click on Next Section to proceed.',
          className: 'custom-notification',
        });
      }
      setIsSaved(true);
    } catch {
      notification.error({
        message: 'Error',
        description: 'Failed to save data. Please try again.',
        className: 'custom-notification',
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handlePrevious = () => {
    navigate('/skills');
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

  return (
    <div style={{ padding: '20px' }}>
      <Form
        {...layout}
        form={form}
        name="personalDetails"
        onFinishFailed={onFinishFailed}
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <Form.Item
          label="Father's Name"
          name="fatherName"
          initialValue={personalDetails.fatherName}
          rules={[{ required: true, message: 'Please input your father\'s name!' }]}
        >
          <Input
            // value={personalDetails.fatherName}
            onChange={(event) => setPersonalDetails({ ...personalDetails, fatherName: event.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="Mother's Name"
          name="motherName"
          rules={[{ required: true, message: 'Please input your mother\'s name!' }]}
        >
          <Input
            value={personalDetails.motherName}
            onChange={(event) => setPersonalDetails({ ...personalDetails, motherName: event.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[{ required: true, message: 'Please input your date of birth!' }]}
        >
          <Input
            value={personalDetails.dateOfBirth}
            onChange={(event) => setPersonalDetails({ ...personalDetails, dateOfBirth: event.target.value })}
          />
        </Form.Item>

        <Form.Item
          label="Marital Status"
          name="maritalStatus"
          rules={[{ required: true, message: 'Please select your marital status!' }]}
        >
          <Select
            placeholder="Select marital status"
            value={personalDetails.maritalStatus}
            onChange={(value) => setPersonalDetails({ ...personalDetails, maritalStatus: value })}
          >
            <Option value="single">Single</Option>
            <Option value="married">Married</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Languages Known"
          name="languagesKnown"
          rules={[{ required: true, message: 'Please input the languages you know!' }]}
        >
          <Input
            value={personalDetails.languagesKnown}
            onChange={(event) => setPersonalDetails({ ...personalDetails, languagesKnown: event.target.value })}
          />
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

export default PersonalDetailsForm;
