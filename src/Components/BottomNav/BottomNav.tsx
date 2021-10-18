import React, { useState } from "react";
import {
  PlayCircleOutlined,
  PlusCircleTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import "./index.css";
import { Button, Divider, Drawer } from "antd";
import UploadForm from "../../Pages/upload/Components/UploadForm";
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
      <PlayCircleOutlined
        className="icon bottom-nav-btn"
        style={{ fontSize: "30px" }}
        onClick={() => handlePush("/learn")}
      />
      {/* <a className="bottom-nav-btn" href="/upload">
        <PlusCircleTwoTone className="icon-plus" />

      </a> */}

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
      <UserOutlined
        className="icon bottom-nav-btn"
        style={{ fontSize: "30px" }}
        onClick={() => handlePush(`/${username}`)}
      />
    </div>
  );
};

export default BottomNav;
