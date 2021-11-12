
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getPreviewImageUrl, STATE } from "../../utils";
import PlaylistForm from "../PlaylistForm";
import CreatePlaylist from "./CreatePlaylist";
import Playlist from "./Playlist";
import ViewPlaylist from "./ViewPlaylist";
import { AllPlaylist } from "../../interface";
import useUserAuthenticationContext from "../../Domains/UserAuthentication/useUserAuthentication";
import usePlaylistContext from "../../Domains/Playlist/usePlaylist";

const PlaylistFeed = ({
  currentVideoId,
  visible,
  handleClose,
}: // playlist,
{
  currentVideoId: string;
  visible: boolean;
  handleClose: () => void;
  // playlist: AllPlaylist[];
}) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<AllPlaylist>();
  const userId = localStorage.getItem("skillUserId");
  const { canAccessService } = useUserAuthenticationContext();
  const { getPlaylistByUserId } = usePlaylistContext();
  const token = canAccessService();
  const [playlist, setPlaylist] = useState<AllPlaylist[]>();

  const [isShowSave, setIsShowSave] = useState(false);

  const [isShowCreatePlaylist, setIsShowCreatePlaylist] = useState(false);

  const handleCloseCreatePlayList = () => {
    setIsShowCreatePlaylist(false);
  };
  const handleOpenCreatePlayList = () => {
    setIsShowCreatePlaylist(true);
  };
  const handleCloseSaveToPlaylist = () => {
    setIsShowSave(false);
  };
  const handleOpenSaveToPlaylist = () => {
    setIsShowSave(true);
  };

  const handleOpenCreatePlaylist = () => {
    setIsShowCreatePlaylist(true);
  };

  const handleSelectPlaylist = ({
    id,
    title,
    description,
    videoList,
    userId,
    permission,
  }: AllPlaylist) => {
    setSelectedPlaylist({
      title,
      description,
      videoList,
      id,
      userId,
      permission,
    });
    handleOpenSaveToPlaylist();
  };

  useEffect(() => {
    if (userId && token) {
      getPlaylistByUserId(token, userId).then((data) => {
        if (data) {
          console.log("playlist by user", data);
          setPlaylist([...data]);
        }
      });
    }
  }, []);
  return (
    <Drawer
      title={`Save to playlist`}
      headerStyle={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
      placement={"right"}
      closable={true}
      onClose={handleClose}
      visible={visible}
      key={"right"}
      destroyOnClose
      height="100%"
      width="100%"
    >
      <Typography style={{ padding: "16px", fontWeight: 500 }}>
        Select a playlist to save clip
      </Typography>

      <Row gutter={[8, 8]}>
        <Col
          xs={8}
          md={4}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "250px",
            width: "100%",
            cursor: "pointer",
            backgroundColor: "#D3D3D3",
          }}
          onClick={handleOpenCreatePlaylist}
        >
          <PlusCircleOutlined style={{ width: "20px", height: "20px" }} />
          <Typography>new playlist</Typography>
        </Col>
        {playlist &&
          playlist.map(
            (
              { title, description, permission, id, videoList }: AllPlaylist,
              index
            ) => (
              <Col
                xs={8}
                md={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "250px",
                  width: "100%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (userId)
                    handleSelectPlaylist({
                      title,
                      description,
                      videoList,
                      id,
                      userId,
                      permission,
                    });
                }}
              >
                <Playlist
                  title={title}
                  previewImage={getPreviewImageUrl(videoList?.[0])}
                  key={index}
                />
              </Col>
            )
          )}
      </Row>
      {/* <PlaylistForm
        visible={openCreateDrawer}
        handleClose={handleCloseCreatePlaylist}
      /> */}
      <CreatePlaylist
        token={token}
        userId={userId}
        videoId={currentVideoId}
        visible={isShowCreatePlaylist}
        handleClose={handleCloseCreatePlayList}
      />
      {selectedPlaylist && (
        <ViewPlaylist
          state={STATE.SAVE}
          playlist={selectedPlaylist}
          visible={isShowSave}
          videoId={currentVideoId}
          handleClose={handleCloseSaveToPlaylist}
        />
      )}
    </Drawer>
  );
};

export default PlaylistFeed;
