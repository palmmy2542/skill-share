import { Drawer, Form, Input, Button, Switch, Row, Col, Popconfirm, Image } from "antd";
import { useState } from "react";
import "./index.css";

const EditPlaylist = ({
  visible,
  title,
  previewImage,
  description,
  tags,
  handleClose
}: {
  visible: boolean;
  title: string;
  previewImage: string;
  description: string;
  tags: Array<string>;
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
      title="Edit Playlist"
      onClose={handleClose}
      visible={visible}
      placement={"bottom"}
      height="100%"
    >
      <Image src={previewImage} preview={false} width={"100%"} height={"100%"} />

      <Form id="edit-playlist-form" layout="vertical">
        <Form.Item
          name="title"
          label="Playlist name"
          >
          <Input size="large" defaultValue={title} placeholder="Playlist name here"/>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          >
          <Input.TextArea size="large" defaultValue={description} placeholder="Description here" autoSize={true}/>
        </Form.Item>
        <Form.Item
          name="tags"
          label="Tag(s)"
          >
          <Input size="large" /*defaultValue={"#"+tags[0]}*/ placeholder="Tags here"/>
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
              onCancel={handleCancel}>
              <Button danger onClick={showPopconfirm}>Delete playlist</Button>
            </Popconfirm>
          </Col>
          <Col flex="auto"></Col>
          <Col>
            <Switch checkedChildren="Public" unCheckedChildren="Private" defaultChecked/>
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="edit-playlist-form-button"
        >
          Update
        </Button>
      </Form>
    </Drawer>
    );
  };
  
  export default EditPlaylist;