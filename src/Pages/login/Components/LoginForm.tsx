import '../index.css';
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { InputValue } from "../../../Domains/UserAuthentication/utils";
import { useState } from "react";
import { PoweroffOutlined } from "@ant-design/icons";

const LoginForm = (props: any) => {
  const { handleLogin, history, ...prop } = props;
  const [isLoading, setIsloading] = useState(false);

  const onFinish = (values: InputValue) => {
    setIsloading(true);
    handleLogin(values).then((res: any) => {
      if (res) {
        console.log("Login success!");
        history.push(`/${values.username}`);
      }
      setIsloading(false);
    });
  };

  return (
    <Form name="login" id="login-form" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <a className="login-form-forgot" href="/#">
          Forgot password?
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="login-form-button"
          loading={isLoading}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;