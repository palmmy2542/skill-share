import "../index.css";
import { Form, Input, Button, Drawer } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { InputValue } from "../../../Domains/UserAuthentication/utils";
import { useState } from "react";
import { UserAccount } from "../../../interface";

const EditProfile = ({
  editProfile,
  handleClose,
  userData,
  token,
}: {
  userData: UserAccount;
  editProfile: ({
    token,
    fname,
    lname,
    password,
    tel,
    email,
  }: {
    token: string;
    fname: string;
    lname: string;
    password: string;
    tel: string;
    email: string;
  }) => Promise<any>;
  token: string | null;
  handleClose: () => void;
}) => {
  const [isLoading, setIsloading] = useState(false);

  const onFinish = (values: any) => {
    if (token) {
      setIsloading(true);
      editProfile({ token, ...values }).then((res: any) => {
        if (res) {
          handleClose();
        } else setIsloading(false);
      });
    }
  };

  return (
    <Form name="login" id="login-form" onFinish={onFinish}>
      <Form.Item name="email">
        <Input
          defaultValue={userData.email}
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="email"
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item name="fname">
        <Input
          defaultValue={userData.fname}
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="First Name"
        />
      </Form.Item>

      <Form.Item name="lname">
        <Input
          defaultValue={userData.lname}
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="Last Name"
        />
      </Form.Item>
      <Form.Item name="tel">
        <Input
          defaultValue={userData.tel}
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="Telephone No."
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="login-form-button"
          loading={isLoading}
        >
          Edit profile
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProfile;
