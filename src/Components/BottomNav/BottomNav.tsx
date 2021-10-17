import React from "react";
import { PlayCircleOutlined, PlusCircleTwoTone, UserOutlined } from "@ant-design/icons";
import "./index.css";
import { Divider } from "antd";

const BottomNav = ({ username }: { username: string }) => {
  return (
    <div className="bottom-nav">
      <a className="bottom-nav-btn" href="/learn">
        <PlayCircleOutlined className="icon" />
      </a>
      <a className="bottom-nav-btn" href="/upload">
        <PlusCircleTwoTone className="icon-plus"/>
        <p></p>
      </a>
      <a className="bottom-nav-btn" href={`/${username}`}>
        <UserOutlined className="icon" />
      </a>
    </div>
  );
};

export default BottomNav;
