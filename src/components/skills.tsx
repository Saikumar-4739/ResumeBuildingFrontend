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

const AddSkillsForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const [skillName, setSkillName] = useState('');
  const [department, setDepartment] = useState('');

  const setItemsToLocalStorage = () => {
    localStorage.setItem('skillName', skillName);
    localStorage.setItem('department', department);
    notification.success({
      message: 'Success',
      description: 'Data saved successfully! Click on Next Section.',
    });
    setIsSaved(true);
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

  const handlePreviousSection = () => {
    navigate('/academics');
  };

  return (
    <Form
      {...layout}
      form={form}
      name="skills"
      initialValues={{ remember: true }}
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      <Form.Item
        label="Skill Name"
        name="skillName"
        rules={[{ required: true, message: 'Please input your skill name!' }]}
      >
        <Input
          value={skillName}
          onChange={(event) => setSkillName(event.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Department"
        name="department"
        rules={[{ required: true, message: 'Please input your department!' }]}
      >
        <Input
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
      <Button
          type="default"
          onClick={handlePreviousSection}
          icon={<ArrowLeftOutlined/>}
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
          icon={<ArrowRightOutlined/>}
        >
          Next Section
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddSkillsForm;
