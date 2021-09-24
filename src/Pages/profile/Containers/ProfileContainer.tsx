import React from "react";
import { UserOutlined } from "@ant-design/icons";
import UserAvatar from "../Components/UserAvatar";

const ProfileContainer = (props: any) => {
  return (
    <div id="profile">
      <UserAvatar>
        <UserOutlined />
      </UserAvatar>
    </div>
  );
};

export default ProfileContainer;
