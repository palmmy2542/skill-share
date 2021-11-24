import { Col, Row, Typography } from "antd";
import React from "react";
import { AllPlaylist } from "../../../interface";
import { getPlaylistPreviewImage } from "../../../utils";

const SearchPlaylistTab = ({
  playlist,
  searchWord,
  handleOpen,
  handleSetIsDrag,
  isDrag,
  handleSelectPlaylist,
}: {
  playlist: AllPlaylist[];
  searchWord: string;
  handleOpen: () => void;
  handleSetIsDrag: (state: boolean) => void;
  isDrag: boolean;
  handleSelectPlaylist: ({
    title,
    description,
    id,
    permission,
    videoList,
    userId,
  }: AllPlaylist) => void;
}) => {
  const userId = localStorage.getItem("skillUserId");
  const filteredPlaylist = playlist.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchWord.toLowerCase()) ||
      item.description.toLowerCase().includes(searchWord.toLowerCase())
    );
  });
  return (
    <>
      {filteredPlaylist.map(
        (
          { title, description, videoList, creatorId, permission, id },
          index
        ) => {
          const isMe = creatorId === userId;
          const shouldShow =
            (isMe && permission === "private") || permission === "public";
          return (
            shouldShow && (
              <Row
                key={index}
                style={{ textAlign: "left", cursor: "pointer" }}
                gutter={[8, 8]}
                onClick={() =>
                  handleSelectPlaylist({
                    title,
                    description,
                    videoList,
                    userId: creatorId,
                    permission,
                    id,
                  })
                }
              >
                <Col xs={12}>
                  <img
                    alt="playlist-preview"
                    src={getPlaylistPreviewImage(videoList?.[0])}
                    className={"preview-playlist-image"}
                  />
                </Col>
                <Col xs={12}>
                  <Typography.Title level={5}>{title}</Typography.Title>
                  <Typography.Paragraph ellipsis={{ rows: 4 }}>
                    {description}
                  </Typography.Paragraph>
                </Col>
              </Row>
            )
          );
        }
      )}
    </>
  );
};

export default SearchPlaylistTab;
