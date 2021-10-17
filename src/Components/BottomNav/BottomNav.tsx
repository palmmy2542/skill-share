import React from "react";
import { PlayCircleOutlined, PlusCircleTwoTone, UserOutlined } from "@ant-design/icons";
import "./index.css";

const BottomNav = ({ username }: { username: string }) => {
  return (
    <div className="bottom-nav">
      <a className="bottom-nav-btn" href="/learn">
        <PlayCircleOutlined className="icon" />
        <p> Learn </p>
      </a>
      <a className="bottom-nav-btn" href="/newVideo">
        <PlusCircleTwoTone className="icon-plus" />
        <p></p>
      </a>
      <a className="bottom-nav-btn" href={`/${username}`}>
        <UserOutlined className="icon" />
        <p> Profile </p>
      </a>
    </div>
  );
};

export default BottomNav;
