import '../index.css';
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginForm = (props: any) => {

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  
  return (
    
    <Form
      name="login"
      id="login-form"
      onFinish={onFinish}
    >

      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
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
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
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
        <a className="login-form-forgot" href="">
          Forgot password?
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size='large' className="login-form-button">
          Log in
        </Button>
      </Form.Item>

    </Form>

  );
};

export default LoginForm;