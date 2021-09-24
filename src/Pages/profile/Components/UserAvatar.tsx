import React from "react";
import "../index.css";
import { Avatar } from "antd";

const UserAvatar: React.FC = (props: any) => {
  return <Avatar size={128} icon={props.children} />;
};

export default UserAvatar;
