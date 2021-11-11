import { UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BottomNav from "../../../Components/BottomNav/BottomNav";
import Navbar from "../../../Components/Navbar/Navbar";
import Playlist from "../../../Components/PlaylistFeed/PlaylistFeed";
import ViewPlaylist from "../../../Components/PlaylistFeed/ViewPlaylist";
import SaveToPlaylist from "../../../Components/SaveToPlaylist";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";
import useUserAuthenticationContext from "../../../Domains/UserAuthentication/useUserAuthentication";
import useUserDataContext from "../../../Domains/UserData/useUserDataContext";
import { ClipProp, UserAccount } from "../../../interface";
import { STATE } from "../../../utils";
import UserAvatar from "../Components/UserAvatar";
import UserClipList from "../Components/UserClipList";
import UserInformation from "../Components/UserInformation";
import "../index.css";

const ProfileContainer = (props: any) => {
  const [clips, setClips] = useState<ClipProp[]>([]);
  const { usernameParam } = useParams<{ usernameParam: string }>();
  const username: string | null = localStorage.getItem("skillUsername");
  const [userData, setUserData] = useState<UserAccount>({
    id: "",
    username: username ?? "USERNAME",
    fname: "",
    lname: "",
    subscribing: 0,
    subscribers: 0,
  });

  const { isMe, isSubscribed, getMe, playlist } = useUserDataContext();
  const { getVideoByUserId, getStreamingUrl } = useClipFeedContext();
  const { canAccessService } = useUserAuthenticationContext();
  const [isShowPlaylist, setIsShowPlaylist] = useState(false);

  const [selectedPlaylist, setSelectedPlaylist] = useState({
    title: "PLAYLIST_TITLE",
    description: "PLAY_DESCRIPTION",
    previewImage: "",
    numberOfVideo: 0,
    videoOwner: "VIDEO_OWNER",
  });

  const handleClosePlaylist = () => setIsShowPlaylist(false);
  const handleSelectPlaylist = (
    title: string,
    description: string,
    previewImage: string,
    numberOfVideo: number,
    videoOwner: string
  ) => {
    setIsShowPlaylist(true);
    setSelectedPlaylist({
      title,
      description,
      previewImage,
      numberOfVideo,
      videoOwner,
    });
  };

  const { subscribing, subscribers } = userData;

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
    if (token) {
      if (username === usernameParam) {
        console.log(username);
        console.log(usernameParam);
        getMe()
          .then((res) => {
            if (res) {
              setUserData({
                username: res.username,
                id: res.id,
                fname: res.fname,
                lname: res.lname,
                subscribers: res.subscribers ?? 0,
                subscribing: res.subscribing ?? 0,
              });
              console.log(res.id);
              return res.id;
            }
          })
          .then((id) => {
            if (id)
              getVideoByUserId(token, id).then((data) => {
                if (data) {
                  const temp: ClipProp[] = data.map(
                    (item: any, index: number) => {
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
                    }
                  );
                  setClips(temp);
                }
              });
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      }
    }
  }, []);

  return (
    <>
      <Navbar name={userData.username} />
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
        <UserClipList
          clips={clips}
          setClips={setClips}
          playlist={playlist}
          handleSelectPlaylist={handleSelectPlaylist}
        />
        <ViewPlaylist
          state={STATE.EDIT}
          playlist={selectedPlaylist}
          visible={isShowPlaylist}
          clips={[]}
          handleClose={handleClosePlaylist}
        />
      </div>
      <BottomNav username={userData.username} />
    </>
  );
};

export default ProfileContainer;
