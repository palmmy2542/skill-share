import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Modal,
  Row,
  Switch,
} from "antd";
import { useHistory } from "react-router";
import useUserAuthenticationContext from "../../Domains/UserAuthentication/useUserAuthentication";
import { deleteVideo } from "../UploadForm/util";
import "./index.css";
import { updateVideo } from "./utils";

const { confirm } = Modal;

const EditClip = ({
  videoId,
  visible,
  title,
  description,
  permission,
  handleClose,
}: {
  videoId: string;
  visible: boolean;
  title: string;
  description: string;
  permission: string;
  handleClose: () => void;
}) => {
  const { canAccessService } = useUserAuthenticationContext();
  const history = useHistory();
  const showConfirmDelete = () => {
    confirm({
      title: "Do you want to delete this video?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteVideo({ token: canAccessService(), videoId: videoId }).then(() =>
          history.push("/")
        );
      },
      onCancel() {
        console.log("Cancel delete video");
      },
    });
  };

  const showConfirmEdit = (values: any) => {
    confirm({
      title: "Do you want to edit this video?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        updateVideo({ token: canAccessService(), videoId, ...values }).then(
          () => {
            message.success("Update success");
            history.push("/");
          }
        );
      },
      onCancel() {
        console.log("Cancel update video");
      },
    });
  };

  return (
    <Drawer
      title="Edit Clip"
      onClose={handleClose}
      visible={visible}
      placement={"bottom"}
      height="100%"
      destroyOnClose
    >
      <Form id="edit-clip-form" layout="vertical" onFinish={showConfirmEdit}>
        <Form.Item
          name="title"
          label="Clip name"
          initialValue={title}
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
        <Form.Item
          name="description"
          initialValue={description}
          label="Description"
        >
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
            <Button danger onClick={showConfirmDelete}>
              Delete clip
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
