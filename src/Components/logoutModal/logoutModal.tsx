import React from "react";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./index.css";

const { confirm } = Modal;

function showLogoutConfirm() {
  confirm({
    title: 'Oh no! You\'re leaving...?',
    content: 'are you sure?',
    style:{ top: "30vh" },
    icon: <ExclamationCircleOutlined />,
    okText:"log out",
    cancelText:"cancel",

    onOk() {
      console.log('Log out');
    },
  });
} 

export default showLogoutConfirm;


