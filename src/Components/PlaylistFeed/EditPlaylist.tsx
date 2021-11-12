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
  Image,
  Modal,
  message,
} from "antd";
import { useState } from "react";
import { useHistory } from "react-router";
import useUserAuthenticationContext from "../../Domains/UserAuthentication/useUserAuthentication";
import "./index.css";
import { editPlaylist } from "./utils";

const { confirm } = Modal;

const EditPlaylist = ({
  visible,
  title,
  previewImage,
  description,
  handleClose,
}: {
  visible: boolean;
  title: string;
  previewImage: string;
  description: string;
  handleClose: () => void;
}) => {
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const history = useHistory();
  const { canAccessService } = useUserAuthenticationContext();

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

  const showConfirmSaveToPlaylist = (values: any) => {
    confirm({
      title: "Do you want to save video to this playlist?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        editPlaylist({ token: canAccessService(), ...values }).then(() => {
          message.success("Update success");
          history.push("/");
        });
      },
      onCancel() {
        console.log("Cancel save video to playlist");
      },
    });
  };

  return (
    <Drawer
      title="Edit Playlist"
      onClose={handleClose}
      visible={visible}
      placement={"bottom"}
      height="100%"
    >
      <Image
        src={previewImage}
        preview={false}
        width={"100%"}
        height={"100%"}
      />

      <Form
        id="edit-playlist-form"
        layout="vertical"
        onFinish={showConfirmSaveToPlaylist}
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
          <Input
            size="large"
            defaultValue={title}
            placeholder="Playlist name here"
          />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea
            size="large"
            defaultValue={description}
            placeholder="Description here"
            autoSize={true}
          />
        </Form.Item>
        <Form.Item name="tags" label="Tag(s)">
          <Input
            size="large"
            /*defaultValue={"#"+tags[0]}*/ placeholder="Tags here"
          />
        </Form.Item>
        <Row>
          <Col xs={12}>
            <Popconfirm
              title="Are you sure？"
              okText="Delete"
              cancelText="Cancel"
              visible={popUpVisible}
              onConfirm={handleOk}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={handleCancel}
            >
              <Button danger onClick={showPopconfirm} style={{ width: "100%" }}>
                Delete playlist
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
          className="edit-playlist-form-button"
          style={{ width: "100%" }}
        >
          Update
        </Button>
      </Form>
    </Drawer>
  );
};

export default EditPlaylist;
