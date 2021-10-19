import React, { useEffect, useState } from "react";
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
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";
import { ClipProp } from "../../../interface";
import useUserAuthenticationContext from "../../../Domains/UserAuthentication/useUserAuthentication";

const ProfileContainer = (props: any) => {
  const [clips, setClips] = useState<ClipProp[]>([]);

  const { userData, isMe, isSubscribed } = useUserDataContext();
  const { getVideoByUserId, getStreamingUrl } = useClipFeedContext();
  const { canAccessService } = useUserAuthenticationContext();

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
