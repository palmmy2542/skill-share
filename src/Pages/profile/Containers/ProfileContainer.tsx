import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import BottomNav from "../../../Components/BottomNav/BottomNav";
import Navbar from "../../../Components/Navbar/Navbar";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";
import useUserAuthenticationContext from "../../../Domains/UserAuthentication/useUserAuthentication";
import useUserDataContext from "../../../Domains/UserData/useUserDataContext";
import { ClipProp } from "../../../interface";
import UserAvatar from "../Components/UserAvatar";
import UserClipList from "../Components/UserClipList";
import UserInformation from "../Components/UserInformation";
import "../index.css";

const ProfileContainer = (props: any) => {
  const [clips, setClips] = useState<ClipProp[]>([]);

  const { userData, isMe, isSubscribed } = useUserDataContext();
  const { getVideoByUserId, getStreamingUrl } = useClipFeedContext();
  const { canAccessService } = useUserAuthenticationContext();

  const { username, id, subscribing, subscribers } = userData;

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

  useEffect(() => {
    const token = canAccessService();
    if (token && id) {
      getVideoByUserId(token, id).then((data) => {
        if (data) {
          const temp: ClipProp[] = data.map((item: any, index: number) => {
            return {
              title: item.videoUploaded.title,
              description: item.videoUploaded.description,
              url: getStreamingUrl(item.videoUploaded.videoId),
              name: `TEST ${index}`,
              isPlay: false,
              comments: [
                { name: "Name_1", comment: "Comment_1" },
                { name: "Name_2", comment: "Comment_2" },
                { name: "Name_3", comment: "Comment_3" },
              ],
            };
          });
          setClips(temp);
        }
      });
      // getRandomVideo(token, 5);
    }
  }, [id]);

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
