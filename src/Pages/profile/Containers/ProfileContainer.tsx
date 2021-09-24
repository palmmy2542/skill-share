import { Avatar } from "antd";
import React from "react";
import { useParams } from "react-router";
import { UserOutlined } from "@ant-design/icons";
import "../index.css";

const ProfileContainer = (props: any) => {
  const { username } = useParams<{ username: string }>();
  return (
    <div id="profile">
      <Avatar
        size={{
          xs: 24,
          sm: 32,
          md: 40,
          lg: 64,
          xl: 80,
          xxl: 100,
        }}
        icon={<UserOutlined />}
      />
      <h1>{username}</h1>
    </div>
  );
};

export default ProfileContainer;
