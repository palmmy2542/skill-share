import React from "react";
import "../index.css";
import { Avatar } from "antd";

const UserAvatar: React.FC = (props: any) => {
  return (
    <Avatar
      size={{
        xs: 24,
        sm: 32,
        md: 40,
        lg: 64,
        xl: 80,
        xxl: 100,
      }}
      icon={props.children}
    />
  );
};

export default UserAvatar;
