
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Space, Typography } from "antd";
import React, { useState } from "react";
import PlaylistForm from "../PlaylistForm";
import CreatePlaylist from "./CreatePlaylist";
import Playlist from "./Playlist";
import { STATE } from "./utils";
import ViewPlaylist from "./ViewPlaylist";

const PlaylistFeed = ({
  visible,
  handleClose,
  playlist,
}: {
  visible: boolean;
  handleClose: () => void;
  playlist: Array<{ title: string; previewImage: string }>;
}) => {

  const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
  const [playlistTitle, setplaylistTitle] = useState("playlist title");
  const [playlistPreviewImage, setplaylistPreviewImage] = useState("preview");
  const [selectedPlaylist, setSelectedPlaylist] = useState({
    title: "PLAYLIST_TITLE",
    description: "PLAY_DESCRIPTION",
    previewImage: "",
    numberOfVideo: 0,
    videoOwner: "VIDEO_OWNER",
  });

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
    //   setplaylistTitle(title);
    //  setplaylistPreviewImage(previewImage);
    setIsShowSave(true);
  };

  const handleOpenCreatePlaylist = () => {
    setOpenCreateDrawer(true);
  };
  const handleCloseCreatePlaylist = () => {
    setOpenCreateDrawer(false);
  };

  return (
    <Drawer
      title={`Save to playlist`}
      headerStyle={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
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
        {playlist.map(
          (
            {
              title,
              previewImage,
            }: {
              title: string;
              previewImage: string;
            },
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
              onClick={handleOpenSaveToPlaylist}
            >
              <Playlist title={title} previewImage={previewImage} key={index} />
            </Col>
          )
        )}
      </Row>
      <PlaylistForm
        visible={openCreateDrawer}
        handleClose={handleCloseCreatePlaylist}
      />
      <CreatePlaylist
        visible={isShowCreatePlaylist}
        handleClose={handleCloseCreatePlayList}
      />
      <ViewPlaylist
        state={STATE.SAVE}
        playlist={selectedPlaylist}
        visible={isShowSave}
        clips={[]}
        handleClose={handleCloseSaveToPlaylist}
      />
    </Drawer>
  );
};

export default PlaylistFeed;
