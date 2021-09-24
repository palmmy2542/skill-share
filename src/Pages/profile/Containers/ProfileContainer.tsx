import React from "react";
import { UserOutlined } from "@ant-design/icons";
import UserAvatar from "../Components/UserAvatar";
import UserInformation from "../Components/UserInformation";

const ProfileContainer = (props: any) => {
  return (
    <div id="profile">
      <UserAvatar>
        <UserOutlined />
      </UserAvatar>
      <UserInformation />
    </div>
  );
};

export default ProfileContainer;
