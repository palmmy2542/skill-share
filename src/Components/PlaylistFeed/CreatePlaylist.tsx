import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Drawer,
  Form,
  Input,
  Button,
  Switch,
  Row,
  Col,
  Popconfirm,
  Modal,
} from "antd";
import { useState } from "react";
import { useHistory } from "react-router";
import useUserAuthenticationContext from "../../Domains/UserAuthentication/useUserAuthentication";
import "./index.css";
import { postNewPlaylist } from "./utils";

const { confirm } = Modal;

const CreatePlaylist = ({
  visible,
  handleClose,
  videoId,
}: {
  visible: boolean;
  handleClose: () => void;
  videoId: string;
}) => {
  const { canAccessService } = useUserAuthenticationContext();
  const history = useHistory();
  const showConfirmCreatePlaylist = (values: any) => {
    confirm({
      title: "Do you want to create playlist?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        postNewPlaylist({
          token: canAccessService(),
          videoId: videoId,
          ...values,
        }).then(() => history.push("/"));
      },
      onCancel() {
        console.log("Cancel create playlist");
      },
    });
  };
  return (
    <Drawer
      title="Create Playlist"
      onClose={handleClose}
      visible={visible}
      placement={"bottom"}
      height="100%"
    >
      <Form
        id="create-playlist-form"
        layout="vertical"
        onFinish={showConfirmCreatePlaylist}
      >
        <Form.Item
          name="title"
          label="Playlist name"
          rules={[
            {
              required: true,
              message: "Playlist name cannot be blank!",
            },
          ]}
        >
          <Input size="large" placeholder="Playlist name here" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea
            size="large"
            placeholder="Description here"
            autoSize={true}
          />
        </Form.Item>
        <Row>
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
          className="playlist-form-button"
        >
          Create Playlist
        </Button>
      </Form>
    </Drawer>
  );
};

export default CreatePlaylist;
