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
  token,
  userId,
  visible,
  handleClose,
  videoId,
}: {
  token: string | null;
  userId: string | null;
  visible: boolean;
  handleClose: () => void;
  videoId: string;
}) => {
  const history = useHistory();
  const showConfirmCreatePlaylist = (values: any) => {
    confirm({
      title: "Do you want to create playlist?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        if (userId && token)
          postNewPlaylist({
            token: token,
            videoList: [videoId],
            userId: userId,
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
        <Form.Item
          name="permission"
          initialValue={"public"}
          valuePropName="checked"
        >
          <Switch
            checkedChildren="public"
            unCheckedChildren="private"
            defaultChecked
          />
        </Form.Item>
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
