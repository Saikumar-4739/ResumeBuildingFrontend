import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { SaveOutlined, EditOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AddUserForm: React.FC = () => {
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await axios.post(`http://localhost:3023/users/${userId}`);
          const data = response.data.data[0];

          if (data) {
            const d = {
              fullName: data.uname,
              email: data.email,
              mobile: data.mobileNo,
              address: {
                street: data.address?.street || '',
                city: data.address?.city || '',
                state: data.address?.state || '',
                country: data.address?.country || '',
                zipcode: data.address?.zipcode || ''
              },
            };

            setFormData(d);
            form.setFieldsValue(d);
            setIsEditing(true);
          } else {
            modal.error({
              title: "Error",
              content: "No data found for the provided user ID.",
            });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            modal.error({
              title: "Error",
              content: error.response?.data?.internalMessage || "Failed to fetch user data. Please try again later.",
            });
          } else {
            modal.error({
              title: "Error",
              content: "An unexpected error occurred. Please try again.",
            });
          }
        }
      } else {
        modal.error({
          title: "Error",
          content: "User ID not found in local storage.",
        });
      }
    };

    fetchUserData();
  }, [form, modal]);

  const handleNextSection = () => {
    navigate("/experience");
  };

  const onFinish = async (values: any) => {
    if (!values.address || !Object.values(values.address).every(Boolean)) {
      modal.error({
        title: "Validation Error",
        content: "Please complete all address fields.",
      });
      return;
    }

    setLoading(true);

    try {
      const endpoint = isEditing 
        ? `http://localhost:3023/users/updateuser/${localStorage.getItem("userId")}`
        : "http://localhost:3023/users/createuser";

      const { data } = await axios.post(endpoint, values);

      if (data.status) {
        if (!isEditing) {
          localStorage.setItem("userId", data.data.userId);
        }
        modal.success({
          title: "Data Saved",
          content: "Data has been saved successfully. Click on the next section to proceed.",
        });
        setIsEditing(true);
      } else {
        modal.error({
          title: "Error",
          content: data.internalMessage || "Failed to save data. Please try again.",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        modal.error({
          title: "Error",
          content: error.response?.data?.internalMessage || "Failed to save data. Please try again later.",
        });
      } else {
        modal.error({
          title: "Error",
          content: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      {contextHolder}
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: "600px", margin: "0 auto" }}
        layout="horizontal"
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input disabled={isEditing} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input disabled={isEditing} />
        </Form.Item>

        <Form.Item
          label="Mobile Number"
          name="mobile"
          rules={[{ required: true, message: "Please input your mobile number!" }]}
        >
          <Input type="tel" disabled={isEditing} />
        </Form.Item>

        <Form.Item
          label="Street"
          name={["address", "street"]}
          rules={[{ required: true, message: "Please input your street!" }]}
        >
          <Input disabled={isEditing} />
        </Form.Item>

        <Form.Item
          label="City"
          name={["address", "city"]}
          rules={[{ required: true, message: "Please input your city!" }]}
        >
          <Input disabled={isEditing} />
        </Form.Item>

        <Form.Item
          label="State"
          name={["address", "state"]}
          rules={[{ required: true, message: "Please input your state!" }]}
        >
          <Input disabled={isEditing} />
        </Form.Item>

        <Form.Item
          label="Country"
          name={["address", "country"]}
          rules={[{ required: true, message: "Please input your country!" }]}
        >
          <Input disabled={isEditing} />
        </Form.Item>

        <Form.Item
          label="Zip Code"
          name={["address", "zipcode"]}
          rules={[{ required: true, message: "Please input your zip code!" }]}
        >
          <Input disabled={isEditing} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          {isEditing ? (
            <>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                type="default"
                icon={<ArrowRightOutlined />}
                onClick={handleNextSection}
                style={{ marginLeft: "10px" }}
              >
                Next Section
              </Button>
            </>
          ) : (
            <>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                htmlType="submit"
                loading={loading}
              >
                Save
              </Button>
            </>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default AddUserForm;
