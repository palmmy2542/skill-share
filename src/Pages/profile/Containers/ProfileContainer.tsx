import { UserOutlined } from "@ant-design/icons";
import { Button, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BottomNav from "../../../Components/BottomNav/BottomNav";
import Navbar from "../../../Components/Navbar/Navbar";
import ViewPlaylist from "../../../Components/PlaylistFeed/ViewPlaylist";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";
import usePlaylistContext from "../../../Domains/Playlist/usePlaylist";
import useUserAuthenticationContext from "../../../Domains/UserAuthentication/useUserAuthentication";
import useUserDataContext from "../../../Domains/UserData/useUserDataContext";
import { AllPlaylist, ClipProp, UserAccount } from "../../../interface";
import { STATE } from "../../../utils";
import UserAvatar from "../Components/UserAvatar";
import UserClipList from "../Components/UserClipList";
import UserInformation from "../Components/UserInformation";
import "../index.css";

const ProfileContainer = (props: any) => {
  const [clips, setClips] = useState<ClipProp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const { isMe, isSubscribed, getMe } = useUserDataContext();
  // const { playlist } = usePlaylistContext();
  const { getVideoByUserId, getStreamingUrl, getPreviewImageUrl } =
    useClipFeedContext();
  const { canAccessService } = useUserAuthenticationContext();
  const { getPlaylistByUserId } = usePlaylistContext();
  const [isShowPlaylist, setIsShowPlaylist] = useState(false);
  const [playlist, setPlaylist] = useState<AllPlaylist[]>();

  const [selectedPlaylist, setSelectedPlaylist] = useState<AllPlaylist>();

  const handleClosePlaylist = () => setIsShowPlaylist(false);
  const handleSelectPlaylist = ({
    title,
    description,
    id,
    permission,
    videoList,
    userId,
  }: AllPlaylist) => {
    setIsShowPlaylist(true);
    setSelectedPlaylist({
      title,
      description,
      id,
      permission,
      videoList,
      userId,
    });
  };

  const { subscribing, subscribers } = userData;

  const renderButton = () => {
    if (isMe) {
      return;
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
              localStorage.setItem("skillUserId", res.id);
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
                        videoId: item.videoUploaded.videoId,
                        title: item.videoUploaded.title,
                        description: item.videoUploaded.description,
                        url: getStreamingUrl(item.videoUploaded.videoId),
                        previewImage: getPreviewImageUrl(
                          item.videoUploaded.videoId
                        ),
                        permission: item.videoUploaded.permission,
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
                setIsLoading(false);
              });
            getPlaylistByUserId(token, id).then((data) => {
              if (data) {
                // console.log("playlist by user", data);
                setPlaylist([...data]);
              }
              setIsLoading(false);
            });
          })
          .catch((err) => {
            message.error(err.response.data.message);
            setIsLoading(false);
          });
      }
    }
  }, []);

  return (
    <>
      <Spin spinning={isLoading} size={"large"}>
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
          {selectedPlaylist && (
            <ViewPlaylist
              state={STATE.EDIT}
              playlist={selectedPlaylist}
              visible={isShowPlaylist}
              handleClose={handleClosePlaylist}
            />
          )}
        </div>
        <BottomNav username={userData.username} />
      </Spin>
    </>
  );
};

export default ProfileContainer;
