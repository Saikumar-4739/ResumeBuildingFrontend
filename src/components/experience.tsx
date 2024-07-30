import React, { useState } from 'react';
import { Form, Input, Button, notification, Modal } from 'antd';
import { SaveOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AddExperienceForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const [objective, setObjective] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [fromYear, setFromYear] = useState('');
  const [toYear, setToYear] = useState('');
  const [description, setDescription] = useState('');


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

  const handlePreviousSection = () => {
    navigate('/user-form');
  };

  const setItemsToLocalStorage = () => {
    localStorage.setItem('objective', objective);
    localStorage.setItem('companyName', companyName);
    localStorage.setItem('role', role);
    localStorage.setItem('fromYear', fromYear);
    localStorage.setItem('toYear', toYear);
    localStorage.setItem('description', description);
    setIsSaved(true);
    Modal.success({
      title: 'Data Saved',
      content: 'Your data has been saved successfully. You can proceed to the next section.',
    });
  };

  return (
    <Form
      form={form}
      name="experience"
      initialValues={{ remember: true }}
      {...layout}
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      <Form.Item
        label="Objective"
        name="objective"
        rules={[{ required: true, message: 'Please input your objective!' }]}
      >
        <Input.TextArea rows={4} 
          value={objective}
          onChange={(event) => setObjective(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Company Name"
        name="companyName"
        rules={[{ required: true, message: 'Please input the company name!' }]}
      >
        <Input
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: 'Please input your role!' }]}
      >
        <Input
          value={role}
          onChange={(event) => setRole(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="From Year"
        name="fromYear"
        rules={[{ required: true, message: 'Please input the starting year!' }]}
      >
        <Input
          type="number"
          value={fromYear}
          onChange={(event) => setFromYear(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="To Year"
        name="toYear"
        rules={[{ required: true, message: 'Please input the ending year!' }]}
      >
        <Input
          type="number"
          value={toYear}
          onChange={(event) => setToYear(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input.TextArea
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
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

export default AddExperienceForm;
