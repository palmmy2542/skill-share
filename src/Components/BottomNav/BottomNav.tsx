import React from "react";
import { PlayCircleOutlined, PlusCircleTwoTone, UserOutlined } from "@ant-design/icons";
import "./index.css";

const BottomNav = () => {
  return (
    <div className="bottom-nav" > 
      <a className="bottom-nav-btn" href="/">
        <PlayCircleOutlined className="icon"/>
        <p> Learn </p>
      </a>
      <a className="bottom-nav-btn" href="/newVideo">
        <PlusCircleTwoTone className="icon-plus"/>
        <p></p>
      </a>
      <a className="bottom-nav-btn" href="/profile">
        <UserOutlined className="icon"/>
        <p> Profile </p>
      </a>
    </div>
  );
};

export default BottomNav;
