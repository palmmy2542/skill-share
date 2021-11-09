import React from "react";
import { useState } from "react";
import BottomMenu from "../../../Components/Clip/BottomMenu";
import EditClip from "../../../Components/Clip/EditClip";
import PlaylistFeed from "../../../Components/PlaylistFeed/PlaylistFeed";
import usePlaylistContext from "../../../Domains/Playlist/usePlaylist";

const HomeContainer = (props: any) => {

  const title = "Clip 1";
  const description = "This clip is for testing";
  const tags = ["clip", "testing", "se3"];

  const [isShow, setIsShow] = useState(true);
  const [isShowEditClip, setIsShowEditClip] = useState(false);
  const [isShowPlaylist, setIsShowPlaylist] = useState(false);
  const { playlist } = usePlaylistContext();
  
  const handleCloseBottomMenu = () => {
    setIsShow(false);
  };

  const handleOpenBottomMenu = () => {
    setIsShow(true);
  };

  const handleCloseEditClip = () => {
    setIsShowEditClip(false);
  };

  const handleOpenEditClip = () => {
    setIsShowEditClip(true);
  };

  const handleClosePlayList = () => {
    setIsShowPlaylist(false);
  };

  const handleOpenPlayList = () => {
    setIsShowPlaylist(true);
  };

  return (
    <div id="home">
      <h1>Home page</h1>
      <EditClip
        visible={isShowEditClip}
        title={title}
        description={description}
        tags={tags}
        handleClose={handleCloseEditClip}
      />
      <PlaylistFeed
        visible={isShowPlaylist}
        playlist={playlist}
        handleClose={handleClosePlayList}
      />
      <BottomMenu
        visible={isShow}
        handleClose={handleCloseBottomMenu}
        handleOpenEditClip={handleOpenEditClip}
        handleOpenPlayList={handleOpenPlayList}
      />
    </div>
  );
};

export default HomeContainer;
