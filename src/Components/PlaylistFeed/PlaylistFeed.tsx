import { PlusCircleOutlined } from "@ant-design/icons";
import { Col, Drawer, Row, Typography } from "antd";
import React, { useState } from "react";
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
  const [playlistTitle, setplaylistTitle] = useState("playlist title");
  const [playlistPreviewImage, setplaylistPreviewImage] = useState("preview");
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
                cursor: "pointer",
              }}
              onClick={handleOpenSaveToPlaylist}
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
      <ViewPlaylist
        state={STATE.SAVE}
        playlist={{
          title: "playlistTitle",
          previewImage:
            "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a dignissim nunc. Donec aliquet fringilla quam ut porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras et tortor viverra, luctus ex et, maximus lectus. ",
          tags: ["#lorem", "#ipsum"],
        }}
        visible={isShowSave}
        clips={[]}
        handleClose={handleCloseSaveToPlaylist}
      />
    </Drawer>
  );
};

export default PlaylistFeed;
