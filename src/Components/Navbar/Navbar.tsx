import React from "react";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import "./index.css";

const Navbar = ({ name }: { name: string }) => {
  return (
    <nav className="navbar">
      <SettingOutlined className="icon icon-setting" />
      <h1 className="name">{name}</h1>
      <LogoutOutlined className="icon icon-logout" />
    </nav>
  );
};

export default Navbar;
