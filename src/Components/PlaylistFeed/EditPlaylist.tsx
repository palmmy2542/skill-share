import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Image,
  Input,
  message,
  Modal,
  Row,
  Switch,
} from "antd";
import { useHistory } from "react-router";
import useUserAuthenticationContext from "../../Domains/UserAuthentication/useUserAuthentication";
import "./index.css";
import { deletePlaylist, editPlaylist } from "./utils";

const { confirm } = Modal;

const EditPlaylist = ({
  visible,
  title,
  previewImage,
  description,
  permission,
  handleClose,
  videoList,
  userId,
  playlistId,
}: {
  visible: boolean;
  title: string;
  previewImage: string;
  description: string;
  permission: string;
  handleClose: () => void;
  videoList: string[];
  userId: string | null;
  playlistId: string;
}) => {
  const history = useHistory();
  const { canAccessService } = useUserAuthenticationContext();

  const showConfirmDelete = () => {
    if (userId)
      confirm({
        title: "Do you want to delete this playlist?",
        icon: <ExclamationCircleOutlined />,
        onOk() {
          deletePlaylist({
            token: canAccessService(),
            id: playlistId,
            userId: userId,
          }).then(() => history.push("/"));
        },
        onCancel() {
          console.log("Cancel delete playlist");
        },
      });
  };

  const showConfirmEditPlaylist = (values: any) => {
    confirm({
      title: "Do you want to save video to this playlist?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        editPlaylist({
          token: canAccessService(),
          ...values,
          videoList,
          userId,
          id: playlistId,
        }).then(() => {
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
      <Image src={previewImage} preview={false} />
      <Form
        id="edit-playlist-form"
        layout="vertical"
        onFinish={showConfirmEditPlaylist}
      >
        <Form.Item
          name="title"
          label="Playlist name"
          initialValue={title}
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
        <Form.Item
          name="description"
          label="Description"
          initialValue={description}
        >
          <Input.TextArea
            size="large"
            defaultValue={description}
            placeholder="Description here"
            autoSize={true}
          />
        </Form.Item>
        <Row>
          <Col xs={12}>
            <Button
              danger
              onClick={showConfirmDelete}
              style={{ width: "100%" }}
            >
              Delete playlist
            </Button>
          </Col>
          <Col flex="auto"></Col>
          <Col>
            <Form.Item
              name="permission"
              initialValue={"public" === permission}
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
