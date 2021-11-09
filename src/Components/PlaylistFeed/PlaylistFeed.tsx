import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Space, Typography } from "antd";
import React from "react";
import Playlist from "./Playlist";
import CreatePlaylist from "./CreatePlaylist";
import { useState } from "react";

const PlaylistFeed = ({
  visible,
  handleClose,
  playlist,
}: {
  visible: boolean;
  handleClose: () => void;
  playlist: Array<{ title: string; previewImage: string }>;
}) => {

  const [isShowCreatePlaylist, setIsShowCreatePlaylist] = useState(false);

  const handleCloseCreatePlayList = () => {
    setIsShowCreatePlaylist(false);
  };

  const handleOpenCreatePlayList = () => {
    setIsShowCreatePlaylist(true);
  };

  return (
    <Drawer
      title={`Save to playlist`}
      headerStyle={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
      }}
      placement={"bottom"}
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
          onClick={() => handleOpenCreatePlayList()}
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
              }}
            >
              <Playlist title={title} previewImage={previewImage} key={index} />
            </Col>
          )
        )}
      </Row>
      <CreatePlaylist
        visible={isShowCreatePlaylist}
        handleClose={handleCloseCreatePlayList}
      />
    </Drawer>
  );
};

export default PlaylistFeed;
