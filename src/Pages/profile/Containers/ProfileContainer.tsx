import React from "react";
import { UserOutlined } from "@ant-design/icons";
import UserAvatar from "../Components/UserAvatar";
import UserInformation from "../Components/UserInformation";
import { Button, Divider } from "antd";
import UserClipList from "../Components/UserClipList";

const ProfileContainer = (props: any) => {
  return (
    <div id="profile">
      <UserAvatar>
        <UserOutlined />
      </UserAvatar>
      <UserInformation />
      <Button size={"large"}>Edit profile</Button>
      <UserClipList />
    </div>
  );
};

export default ProfileContainer;
