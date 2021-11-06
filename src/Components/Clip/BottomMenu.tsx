import { MoreOutlined } from "@ant-design/icons";
import { Drawer, List } from "antd";
import React from "react";

const items = [
  { title: "Edit video", callback: () => {} },
  { title: "save to playlist", callback: () => {} },
];

const BottomMenu = ({
  visible,
  handleClose,
}: {
  visible: boolean;
  handleClose: () => void;
}) => {
  return (
    <Drawer
      placement={"bottom"}
      closable={false}
      onClose={handleClose}
      visible={visible}
      key={"bottom"}
      height="15%"
    >
      <List
        bordered
        dataSource={items}
        renderItem={(item: any) => (
          <List.Item style={{ height: "50%" }} onClick={item.callback}>
            {item.title}
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default BottomMenu;
