import { Drawer, Form, Input, Button, Switch, Row, Col, Popconfirm } from "antd";
import { useState } from "react";
import useUserAuthenticationContext from "../../Domains/UserAuthentication/useUserAuthentication";
import "./index.css";
import { updateVideo } from "./utils";

const EditClip = ({
  visible,
  title,
  description,
  permission,
  handleClose,
}: {
  visible: boolean;
  title: string;
  description: string;
  permission: string;
  handleClose: () => void;
}) => {
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { canAccessService } = useUserAuthenticationContext();

  const showPopconfirm = () => {
    setPopUpVisible(true);
  };

  const handleOk = (values: any) => {
    setConfirmLoading(true);
    console.log("values", values);
    updateVideo({ token: canAccessService(), ...values });
  };

  const handleCancel = () => {
    setPopUpVisible(false);
  };

  return (
    <Drawer
      title="Edit Clip"
      onClose={handleClose}
      visible={visible}
      placement={"bottom"}
      height="100%"
    >
      <Form id="edit-clip-form" layout="vertical" onFinish={handleOk}>
        <Form.Item
          name="title"
          label="Clip name"
          rules={[
            {
              required: true,
              message: "Clip name cannot be blank!",
            },
          ]}
        >
          <Input
            size="large"
            defaultValue={title}
            placeholder="Clip name here"
          />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea
            size="large"
            defaultValue={description}
            placeholder="Description here"
            autoSize={true}
            rows={2}
          />
        </Form.Item>
        <Row>
          <Col>
            <Button danger onClick={showPopconfirm}>
              Delete clip
            </Button>
          </Col>
          <Col flex="auto"></Col>
          <Col>
            <Form.Item
              name="permission"
              initialValue={permission}
              valuePropName="checked"
            >
              <Switch
                checkedChildren="public"
                unCheckedChildren="private"
                defaultChecked
              />
            </Form.Item>
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="edit-clip-form-button"
        >
          Update
        </Button>
      </Form>
    </Drawer>
  );
};

  export default EditClip;