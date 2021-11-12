import { Drawer } from "antd";
import React from "react";

const PlaylistForm = ({
  visible,
  handleClose,
}: {
  visible: boolean;
  handleClose: () => void;
}) => {
  return (
    <Drawer
      title={`Create Playlist`}
      headerStyle={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
      placement={"right"}
      closable={true}
      onClose={handleClose}
      visible={visible}
      key={"right"}
      destroyOnClose
      height="100%"
      width="100%"
    ></Drawer>
  );
};

export default PlaylistForm;
