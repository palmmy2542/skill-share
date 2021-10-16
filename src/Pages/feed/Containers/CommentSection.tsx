import { RightOutlined } from "@ant-design/icons";
import { Drawer, List, Avatar, Form, Input, Affix, Button } from "antd";
import React from "react";
import Comment from "../Components/Comment";
import "../index.css";

const CommentSection = ({
  visible,
  setVisible,
  comments,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  comments: Array<{ name: string; comment: string }>;
}) => {
  const [form] = Form.useForm();
  return (
    <Drawer
      placement={"bottom"}
      closable={false}
      onClose={(e) => {
        setVisible(false);
      }}
      visible={visible}
      key={"bottom"}
    >
      <List
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.comment}
            />
          </List.Item>
        )}
      />
      <Form
        layout="inline"
        hideRequiredMark
        form={form}
        style={{ justifyContent: "center" }}
      >
        <Form.Item name="comment" style={{ width: "75%" }}>
          <Input placeholder="Do you have something in mind ?" />
        </Form.Item>
        <Form.Item>
          <Button icon={<RightOutlined />} style={{ margin: 0 }}></Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CommentSection;
