import React from "react";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import showLogoutConfirm from "../logoutModal/logoutModal";
import "./index.css";
import useUserAuthenticationContext from "../../Domains/UserAuthentication/useUserAuthentication";
import { useHistory } from "react-router";

const Navbar = ({ name }: { name: string }) => {
  const { logout } = useUserAuthenticationContext();
  const history = useHistory();
  return (
    <nav className="navbar">
      <SettingOutlined className="icon icon-setting" />
      <h1 className="name">{name}</h1>
      <LogoutOutlined
        className="icon icon-logout"
        onClick={() => showLogoutConfirm({ logout, history })}
      />
    </nav>
  );
};

export default Navbar;
