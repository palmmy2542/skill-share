import { Col, Row, Typography } from "antd";
import React from "react";

const SearchPlaylistTab = ({
  playlist,
  searchWord,
  handleOpen,
  handleClickSlide,
  handleSetIsDrag,
  isDrag,
}: {
  playlist: Array<{
    title: string;
    description: string;
    previewImage: string;
    numberOfVideo: number;
    videoOwner: string;
  }>;
  searchWord: string;
  handleOpen: () => void;
  handleClickSlide: (index: number) => void;
  handleSetIsDrag: (state: boolean) => void;
  isDrag: boolean;
}) => {
  const filteredPlaylist = playlist.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchWord.toLowerCase()) ||
      item.description.toLowerCase().includes(searchWord.toLowerCase())
    );
  });

  const handleClickPlaylist = () => {};
  return (
    <>
      {filteredPlaylist.map(
        ({ title, description, previewImage, numberOfVideo, videoOwner }) => (
          <Row
            style={{ textAlign: "left", cursor: "pointer" }}
            gutter={[8, 8]}
            onClick={handleClickPlaylist}
          >
            <Col xs={12}>
              <img src={previewImage} className={"preview-playlist-image"} />
            </Col>
            <Col xs={12}>
              <Typography.Title level={5}>{title}</Typography.Title>
              <Typography.Paragraph ellipsis={{ rows: 4 }}>
                {description}
              </Typography.Paragraph>
              <Typography.Text>
                {numberOfVideo} clips by {videoOwner}
              </Typography.Text>
            </Col>
          </Row>
        )
      )}
    </>
  );
};

export default SearchPlaylistTab;
