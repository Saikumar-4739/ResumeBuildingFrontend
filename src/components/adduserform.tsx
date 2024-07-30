import React, { useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { SaveOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");

  const handleNextSection = () => {
    navigate('/experience');
  };

  const setItemsToLocalStorage = () => {
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('email', email);
    localStorage.setItem('mobile', mobile);
    localStorage.setItem('street', street);
    localStorage.setItem('city', city);
    localStorage.setItem('state', state);
    localStorage.setItem('country', country);
    localStorage.setItem('zipcode', zipcode);
    modal.success({
      title: 'Data Saved',
      content: 'Data has been saved successfully. Click on next page to proceed.',
    });
  };

  const onFinish = () => {
    setItemsToLocalStorage();
  };

  return (
    <>
      {contextHolder}
      <Form {...layout} name="userform" 
      initialValues={{ remember: true }} 
      onFinish={onFinish} 
      style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Mobile Number"
          name="mobile"
          rules={[{ required: true, message: 'Please input your mobile number!' }]}
        >
          <Input
            type="number"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Street"
          name={['address', 'street']}
          rules={[{ required: true, message: 'Please input your street!' }]}
        >
          <Input
            value={street}
            onChange={(event) => setStreet(event.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="City"
          name={['address', 'city']}
          rules={[{ required: true, message: 'Please input your city!' }]}
        >
          <Input
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="State"
          name={['address', 'state']}
          rules={[{ required: true, message: 'Please input your state!' }]}
        >
          <Input
            value={state}
            onChange={(event) => setState(event.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Country"
          name={['address', 'country']}
          rules={[{ required: true, message: 'Please input your country!' }]}
        >
          <Input
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Zip Code"
          name={['address', 'zipcode']}
          rules={[{ required: true, message: 'Please input your zip code!' }]}
        >
          <Input
            type="number"
            value={zipcode}
            onChange={(event) => setZipcode(event.target.value)}
          />
        </Form.Item>

        <Form.Item  {...tailLayout}>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            htmlType="submit"
          >
            Save
          </Button>
          <Button
            type="default"
            icon={<ArrowRightOutlined />}
            onClick={handleNextSection}
            style={{ marginLeft: '10px' }}
          >
            Next Section
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddUserForm;
