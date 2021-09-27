import '../index.css';
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const RegisterForm = (props: any) => {

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  
  return (
    
    <Form
      name="register"
      id="register-form"
      onFinish={onFinish}
    >

      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Username cannot be blank!',
          },
        ]}
      >
        <Input
          size='large'
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Email cannot be blank!',
          },
        ]}
      >
        <Input
          size='large'
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Password cannot be blank!',
          },
        ]}
      >
        <Input
          size='large'
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size='large' className="register-form-button">
          Sign up
        </Button>
      </Form.Item>

    </Form>

  );
};

export default RegisterForm;