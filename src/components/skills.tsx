import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const storedSkills = localStorage.getItem(`skills_${userId}`);
    if (storedSkills) {
      form.setFieldsValue(JSON.parse(storedSkills));
    }
  }, [form, userId]);

  const onFinish = async (values: any) => {
    try {
      const formattedValues = { ...values, userId }; // Include userId in the payload
      const response = await axios.post('http://localhost:3023/skills/createSkill', formattedValues);
      if (response.status === 200) {
        if (userId) {
          localStorage.setItem(`skills_${userId}`, JSON.stringify(formattedValues));
        }

        notification.success({
          message: 'Success',
          description: 'Skills submitted successfully!',
        });
        setIsSaved(true);
      } else {
        throw new Error('Failed to save skills');
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'There was an error creating the skills!',
      });
      setIsSaved(false);
    }
  };

  const handleSave = () => {
    form.submit();
  };

  const handleUpdate = () => {
    form.submit();
  };

  const handleNextSection = () => {
    if (isSaved) {
      navigate('/personal-details');
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
      onFinish={onFinish}
    >
      <Form.Item
        label="Skill Name"
        name="skillName"
        rules={[{ required: true, message: 'Please input your skill name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Department"
        name="department"
        rules={[{ required: true, message: 'Please input your department!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={handleSave} style={{ marginRight: '10px' }}>
          Save
        </Button>
        <Button type="default" onClick={handleUpdate} style={{ marginRight: '10px' }}>
          Update
        </Button>
        <Button type="default" onClick={handlePreviousSection} style={{ marginRight: '10px' }}>
          Previous Section
        </Button>
        <Button type="default" onClick={handleNextSection}>
          Next Section
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddSkillsForm;
