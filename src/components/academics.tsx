// src/pages/AddAcademicsForm.tsx
import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SaveOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

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
  const [institutionName, setInstitutionName] = useState('');
  const [passingYear, setPassingYear] = useState('');
  const [qualification, setQualification] = useState('');
  const [university, setUniversity] = useState('');
  const [percentage, setPercentage] = useState('');

  const setItemsToLocalStorage = () => {
    localStorage.setItem('institutionName', institutionName);
    localStorage.setItem('passingYear', passingYear);
    localStorage.setItem('qualification', qualification);
    localStorage.setItem('university', university);
    localStorage.setItem('percentage', percentage);
    notification.success({
      message: 'Success',
      description: 'Data saved successfully! Click on Next Section.',
    });
    setIsSaved(true);
  };

  const handleNextSection = () => {
    if (isSaved) {
      navigate('/skills');
    } else {
      notification.warning({
        message: 'Warning',
        description: 'Please save the details before proceeding to the next section.',
      });
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
    >
      <Form.Item
        label="Institution Name"
        name="institutionName"
        rules={[{ required: true, message: 'Please input your institution name!' }]}
      >
        <Input
          value={institutionName}
          onChange={(event) => setInstitutionName(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Passing Year"
        name="passingYear"
        rules={[{ required: true, message: 'Please input your passing year!' }]}
      >
        <Input
          type="number"
          value={passingYear}
          onChange={(event) => setPassingYear(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Qualification"
        name="qualification"
        rules={[{ required: true, message: 'Please input your qualification!' }]}
      >
        <Input
          value={qualification}
          onChange={(event) => setQualification(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="University"
        name="university"
        rules={[{ required: true, message: 'Please input your university!' }]}
      >
        <Input
          value={university}
          onChange={(event) => setUniversity(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Percentage"
        name="percentage"
        rules={[{ required: true, message: 'Please input your percentage!' }]}
      >
        <Input
          type="number"
          value={percentage}
          onChange={(event) => setPercentage(event.target.value)}
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
        <Button
          type="primary"
          onClick={setItemsToLocalStorage}
          icon={<SaveOutlined />}
          style={{ marginRight: '10px' }}
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
  );
};
