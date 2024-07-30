import React, { useState } from 'react';
import { Form, Input, Select, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined, SaveOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const PersonalDetailsForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [languagesKnown, setLanguagesKnown] = useState('');

  const setItemsToLocalStorage = () => {
    localStorage.setItem('fatherName', fatherName);
    localStorage.setItem('motherName', motherName);
    localStorage.setItem('dateOfBirth', dateOfBirth);
    localStorage.setItem('maritalStatus', maritalStatus);
    localStorage.setItem('languagesKnown', languagesKnown);
    notification.success({
      message: 'Data Saved',
      description: 'Data has been saved successfully. Click on Next Section to proceed.',
    });
    setIsSaved(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handlePrevious = () => {
    navigate('/skills');
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
        name="personalDetails"
        onFinishFailed={onFinishFailed}
        initialValues={{}}
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <Form.Item
          label="Father's Name"
          name="fatherName"
          rules={[{ required: true, message: 'Please input your father\'s name!' }]}
        >
          <Input
            value={fatherName}
            onChange={(event) => setFatherName(event.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Mother's Name"
          name="motherName"
          rules={[{ required: true, message: 'Please input your mother\'s name!' }]}
        >
          <Input
            value={motherName}
            onChange={(event) => setMotherName(event.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[{ required: true, message: 'Please input your date of birth!' }]}
        >
          <Input
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Marital Status"
          name="maritalStatus"
          rules={[{ required: true, message: 'Please select your marital status!' }]}
        >
          <Select
            placeholder="Select marital status"
            value={maritalStatus}
            onChange={(value) => setMaritalStatus(value)}
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
            value={languagesKnown}
            onChange={(event) => setLanguagesKnown(event.target.value)}
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
            onClick={setItemsToLocalStorage}
            icon={<SaveOutlined />}
            style={{ marginRight: '8px' }}
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




