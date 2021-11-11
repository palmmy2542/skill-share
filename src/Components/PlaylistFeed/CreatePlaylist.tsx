import { Drawer, Form, Input, Button, Switch, Row, Col, Popconfirm } from "antd";
import { useState } from "react";
import "./index.css";

const CreatePlaylist = ({
  visible,
  handleClose
}: {
  visible: boolean;
  handleClose: () => void;
}) => {
  return (
    <Drawer
      title="Create Playlist"
      onClose={handleClose}
      visible={visible}
      placement={"bottom"}
      height="100%"
    >
      <Form id="create-playlist-form" layout="vertical">
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
          <Input size="large" placeholder="Playlist name here"/>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          >
          <Input.TextArea size="large" placeholder="Description here" autoSize={true}/>
        </Form.Item>
        <Form.Item
          name="tags"
          label="Tag(s)"
          >
          <Input size="large" placeholder="Tags here"/>
        </Form.Item>
        <Row>
          <Col flex="auto"></Col>
          <Col>
            <Switch checkedChildren="Public" unCheckedChildren="Private" defaultChecked/>
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