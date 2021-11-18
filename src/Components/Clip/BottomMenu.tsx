import { Drawer, List } from "antd";
import React from "react";

const BottomMenu = ({
  visible,
  handleClose,
  handleOpenEditClip,
  handleOpenPlayList,
}: {
  visible: boolean;
  handleClose: () => void;
  handleOpenEditClip: () => void;
  handleOpenPlayList: () => void;
}) => {
  const items = [
    { title: "Edit clip", callback: handleOpenEditClip },
    { title: "Save to playlist", callback: handleOpenPlayList },
  ];
  return (
    <Drawer
      placement={"bottom"}
      closable={false}
      onClose={handleClose}
      visible={visible}
      key={"bottom"}
      height="15%"
      className={"bottom-menu"}
    >
      <List
        bordered
        dataSource={items}
        className={"list-menu"}
        renderItem={(item: any) => (
          <List.Item
            style={{ height: "50%", cursor: "pointer" }}
            onClick={() => item.callback()}
          >
            {item.title}
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default BottomMenu;
