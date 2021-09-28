import React from "react";
import { UserOutlined } from "@ant-design/icons";
import UserAvatar from "../Components/UserAvatar";
import UserInformation from "../Components/UserInformation";
import { Button, Divider } from "antd";
import UserClipList from "../Components/UserClipList";
import "../index.css";
import Navbar from "../../../Components/Navbar/Navbar";
import useUserDataContext from "../../../Domains/UserData/useUserDataContext";
import { useParams } from "react-router";
import BottomNav from "../../../Components/BottomNav/BottomNav";

const ProfileContainer = (props: any) => {
  const { userData } = useUserDataContext();
  const { userParam } = useParams<{ userParam: string }>();
  const { subscribing, subscribers, clips } = userData;

  return (
    <>
      <Navbar name={userParam} />
      <div id="profile" className="page-layout">
        <UserAvatar>
          <UserOutlined />
        </UserAvatar>
        <UserInformation
          subscribing={subscribing}
          subscribers={subscribers}
          clips={clips}
        />
        <Button size={"large"}>Edit profile</Button>
        <UserClipList />
      </div>
      <BottomNav />
    </>
  );
};

export default ProfileContainer;
