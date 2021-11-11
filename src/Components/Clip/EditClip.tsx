import { Drawer, Form, Input, Button, Switch, Row, Col, Popconfirm } from "antd";
import { useState } from "react";
import "./index.css";

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

  const showPopconfirm = () => {
    setPopUpVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setPopUpVisible(false);
      setConfirmLoading(false);
    }, 2000);
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
      <Form id="edit-clip-form" layout="vertical">
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
            <Popconfirm
              title="Are you sure？"
              okText="Delete"
              cancelText="Cancel"
              visible={popUpVisible}
              onConfirm={handleOk}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={handleCancel}
            >
              <Button danger onClick={showPopconfirm}>
                Delete clip
              </Button>
            </Popconfirm>
          </Col>
          <Col flex="auto"></Col>
          <Col>
            <Switch
              checkedChildren="Public"
              unCheckedChildren="Private"
              defaultChecked
            />
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