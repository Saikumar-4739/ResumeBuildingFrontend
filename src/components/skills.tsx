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

interface Skills {
  skillName: string;
  department: string;
}

const AddSkillsForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [skills, setSkills] = useState<Skills>({
    skillName: '',
    department: ''
  });

  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));
  const [skillId, setSkillId] = useState<number | null>(null); // Assuming skillId is a number

  useEffect(() => {
    if (userId) {
      fetchSkillData(userId);
    }
  }, [userId]);

  const fetchSkillData = async (userId: string) => {
    try {
      const response = await axios.post(`http://localhost:3023/skills/${userId}`);
      const backendData: Skills[] = response.data.data;
      if (backendData.length > 0) {
        const updatedData: Skills = {
          skillName: backendData[0].skillName,
          department: backendData[0].department
        };
        setSkills(updatedData);
        setIsEditing(true);
        form.setFieldsValue(updatedData);
      }
    } catch {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch data',
        className: 'custom-notification'
      });
    }
  };

  const saveDataToBackend = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      notification.error({
        message: 'Error',
        description: 'User ID not found. Please make sure you have saved user details.',
      });
      return;
    }

    const data = form.getFieldsValue();

    try {
      if (isEditing && skillId) {
        await axios.put(`http://localhost:3023/skills/updateSkill/${skillId}`, data);
        notification.success({
          message: 'Success',
          description: 'Skill updated successfully! Click on Next Section.',
        });
      } else {
        await axios.post('http://localhost:3023/skills/createSkill', { ...data, userId });
        notification.success({
          message: 'Success',
          description: 'Skill saved successfully! Click on Next Section.',
        });
      }
      setIsSaved(true);
    } catch {
      notification.error({
        message: 'Error',
        description: 'Failed to save skill data. Please try again.',
      });
    }
  };

  const handleNextSection = () => {
    if (isSaved) {
      navigate('/personal-details');
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
      style={{ maxWidth: '600px', margin: '0 auto' }}
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
          onClick={saveDataToBackend}
          icon={isEditing ? <EditOutlined /> : <SaveOutlined />}
          style={{ marginRight: '10px' }}
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
  );
};

export default AddSkillsForm;
