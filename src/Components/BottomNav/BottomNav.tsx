import {
  PlayCircleOutlined,
  PlusCircleTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { Drawer } from "antd";
import React, { useState } from "react";
import UploadForm from "../UploadForm/UploadForm";
import "./index.css";

const BottomNav = ({ username }: { username: string }) => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  return (
    <div className="bottom-nav">
      <a href={"/learn"} className={"bottom-nav-btn"}>
        <PlayCircleOutlined className="icon " style={{ fontSize: "30px" }} />
      </a>

      <PlusCircleTwoTone className="icon-plus" onClick={handleOpen} />
      <Drawer
        placement={"bottom"}
        visible={visible}
        onClose={handleClose}
        closable={true}
        width={"100%"}
        keyboard
        destroyOnClose
        height="100%"
      >
        <UploadForm />
      </Drawer>
      <a href={`/${username}`} className={"bottom-nav-btn"}>
        <UserOutlined className="icon" style={{ fontSize: "30px" }} />
      </a>
    </div>
  );
};

export default BottomNav;
