import React from "react";
import { UserOutlined } from "@ant-design/icons";
import UserAvatar from "../Components/UserAvatar";
import UserInformation from "../Components/UserInformation";
import { Button } from "antd";
import UserClipList from "../Components/UserClipList";
import "../index.css";
import Navbar from "../../../Components/Navbar/Navbar";
import useUserDataContext from "../../../Domains/UserData/useUserDataContext";
import { useHistory, useParams } from "react-router";
import BottomNav from "../../../Components/BottomNav/BottomNav";

const ProfileContainer = (props: any) => {
  const { userData, clips, setClips, isMe, isSubscribed } =
    useUserDataContext();
  const { userParam } = useParams<{ userParam: string }>();
  const { username, id, fname, lname, subscribing, subscribers } = userData;
  const history = useHistory();

  const renderButton = () => {
    if (isMe) {
      return <Button size={"middle"}>Edit profile</Button>;
    } else if (isSubscribed) {
      return <Button size={"middle"}>Un subscribe</Button>;
    } else if (!isSubscribed) {
      return (
        <Button size={"middle"} type={"primary"}>
          subscribe
        </Button>
      );
    }
  };

  return (
    <>
      <Navbar name={username} />
      <div id="profile" className="page-layout">
        <UserAvatar>
          <UserOutlined />
        </UserAvatar>
        <UserInformation
          subscribing={subscribing}
          subscribers={subscribers}
          clips={clips}
        />
        {renderButton()}
        <UserClipList clips={clips} setClips={setClips} />
      </div>
      <BottomNav username={username} />
    </>
  );
};

export default ProfileContainer;
