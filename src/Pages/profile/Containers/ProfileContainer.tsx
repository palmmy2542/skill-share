import { Button, message, Spin } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
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

  const { isSubscribed, getMe, getUserByUsername } = useUserDataContext();
  const history = useHistory();
  const { getVideoByUserId, getStreamingUrl, getPreviewImageUrl } =
    useClipFeedContext();
  const { canAccessService } = useUserAuthenticationContext();
  const { getPlaylistByUserId } = usePlaylistContext();
  const [isShowPlaylist, setIsShowPlaylist] = useState(false);
  const [playlist, setPlaylist] = useState<AllPlaylist[]>();
  const isMe = useMemo(
    () => username === usernameParam,
    [username, usernameParam]
  );
  const token = canAccessService();

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

  const renderButton = () => {
    if (isMe) {
      return;
    } else if (isSubscribed) {
      return <Button size={"middle"}>Un subscribe</Button>;
    }
  };

  useEffect(() => {
    if (token) {
      getUserByUsername({ username: usernameParam })
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
                  (videoUploaded: any, index: number) => {
                    return {
                      videoId: videoUploaded.videoId,
                      title: videoUploaded.title,
                      description: videoUploaded.description,
                      url: getStreamingUrl(videoUploaded.videoId),
                      previewImage: getPreviewImageUrl(videoUploaded.videoId),
                      userId: videoUploaded.creator,
                      permission: videoUploaded.permission,
                      username: videoUploaded.creatorName,
                      isPlay: false,
                    };
                  }
                );
                setClips(temp);
              }
              setIsLoading(false);
            });
          getPlaylistByUserId(token, id).then((data) => {
            if (data) {
              setPlaylist([...data]);
            }
            setIsLoading(false);
          });
        })
        .catch((err) => {
          message.error(err.response.data.message);
          history.push("/error");
        });
    }
  }, [usernameParam]);

  return (
    <>
      <Spin spinning={isLoading} size={"large"}>
        <Navbar name={usernameParam} />
        <div id="profile" className="page-layout">
          <UserAvatar>{usernameParam[0]}</UserAvatar>
          <UserInformation
            playlistNumber={playlist?.length}
            clipNumber={clips.length}
          />
          {renderButton()}
          <UserClipList
            clips={clips}
            isMe={isMe}
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
