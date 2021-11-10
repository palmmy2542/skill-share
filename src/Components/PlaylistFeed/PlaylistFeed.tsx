import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Space, Typography } from "antd";
import React, { useState } from "react";
import { usePlaylistContext } from "../../Domains/Playlist/usePlaylist";
import Playlist from "./Playlist";
import SaveToPlaylist from "../SaveToPlaylist";

const PlaylistFeed = ({
  visible,
  handleClose,
  playlist,
}: {
  visible: boolean;
  handleClose: () => void;
  playlist: Array<{ title: string; previewImage: string }>;
}) => {
  const [isShowSaveToPlaylist, setIsShowSaveToPlaylist] = useState(false);
  const handleCloseSaveToPlaylist = () => {
    setIsShowSaveToPlaylist(false);
  };

  const handleOpenSaveToPlaylist = () => {
    setIsShowSaveToPlaylist(true);
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
              onClick={() => handleOpenSaveToPlaylist()}
            >
              <Playlist title={title} previewImage={previewImage} key={index} />
            </Col>
          )
        )}
      </Row>
      <SaveToPlaylist
        visible={isShowSaveToPlaylist}
        handleClose={handleCloseSaveToPlaylist}
      />
    </Drawer>
  );
};

export default PlaylistFeed;
