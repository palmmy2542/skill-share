import React, { useState } from "react";
import {
  PlayCircleOutlined,
  PlusCircleTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import "./index.css";
import { Button, Divider, Drawer } from "antd";
import UploadForm from "../UploadForm/UploadForm";
import { useHistory } from "react-router";

const BottomNav = ({ username }: { username: string }) => {
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  const handlePush = (path: string) => {
    history.push(path);
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
