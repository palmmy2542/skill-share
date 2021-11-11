import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Divider, Typography } from "antd";
import React from "react";
import Playlist from "./Playlist";
import PreviewClip from "../PreviewClip/PreviewClip";
import EditPlaylist from "./EditPlaylist";
import { ClipProp } from "../../interface";
import { useState } from "react";
import "./index.css";

const ViewPlaylist = ({
  state,
  playlist,
  visible,
  clips,
  handleClose
  /* 
   handleClickSlide,
   handleSetIsDrag,
   isDrag,*/
}: {

  state: string;
  playlist: {
    title: string;
    previewImage: string;
    description: string;
    tags: Array<string>;
  }
  visible: boolean;
  clips: ClipProp[];
  handleClose: () => void;
  /*
  handleClickSlide: (index: number) => void;
  handleSetIsDrag: (state: boolean) => void;
  isDrag: boolean;*/
}) => {

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [isOpenEditPlaylist, setIsOpenEditPlaylist] = useState<boolean>(false);
  const handleSetIsDrag = (state: boolean) => {
    setIsDrag(state);
  };

  const handleClickSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleOpenEditPlaylist = () => {
    setIsOpenEditPlaylist(true);
  };
  const handleCloseEditPlaylist = () => {
    setIsOpenEditPlaylist(false);
  };
  let PlaylistDrawer, SubmitButton;
  if (state == "Save") {
    return (
      <Drawer
        title={`Save to playlist`}
        headerStyle={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
        }}
        placement={"bottom"}
        onClose={handleClose}
        visible={visible}
        height="100%"
        width="100%"
      >
        <Row justify="space-around"
        >
          <Col
            className="gutter-row setsize"
            span={10}
          >
            <Playlist title={playlist.title} previewImage={playlist.previewImage} />
          </Col>
          <Col
            className="gutter-row"
            span={10}
          >
            <Typography>
              <Typography.Title level={3}>{playlist.title}</Typography.Title>
              <Typography.Paragraph>{playlist.description}</Typography.Paragraph>
              <Typography.Title level={5}>{playlist.tags}</Typography.Title>
              <Typography.Paragraph></Typography.Paragraph>
            </Typography>
          </Col>
        </Row>
        <Row
          justify="center"
        >
          <Button
            htmlType="submit"
            size="large"
            id="edit-playlist-form-button"
            style={{ whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}
            >
            Save clip to playlist
          </Button>
        </Row>
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

          </Col>
          {clips.map(
            (
              { name, url, isPlay, title, description, tags }: ClipProp,
              index: number
            ) => (
              <Col
                xs={12}
                md={8}
                lg={6}
                xl={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "250px",
                }}
                key={index}
              >
                <PreviewClip
                  url={url}
                  isPlay={isPlay}
                  index={index}
                  key={index}
                  handleClickSlide={handleClickSlide}
                  handleSetIsDrag={handleSetIsDrag}
                  isDrag={isDrag}
                  handleOpen={function (): void {
                  }}
                />
              </Col>
            )
          )}
        </Row>
      </Drawer>
    );
  }
  else {
    return (
      <Drawer
        title={`Playlist`}
        headerStyle={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
        }}
        placement={"bottom"}
        onClose={handleClose}
        visible={visible}
        height="100%"
        width="100%"
      >
        <Row justify="space-around"
        >
          <Col
            className="gutter-row setsize"
            span={10}
          >
            <Playlist title={playlist.title} previewImage={playlist.previewImage} />
          </Col>
          <Col
            className="gutter-row"
            span={10}
          >
            <Typography>
              <Typography.Title level={3}>{playlist.title}</Typography.Title>
              <Typography.Paragraph>{playlist.description}</Typography.Paragraph>
              <Typography.Title level={5}>{playlist.tags}</Typography.Title>
              <Typography.Paragraph></Typography.Paragraph>
            </Typography>
          </Col>
        </Row>
        <Row
          justify="center"
        >
          <Button
            htmlType="submit"
            size="large"
            id="edit-playlist-form-button"
            style={{ whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}
            onClick={handleOpenEditPlaylist}>
            Edit
          </Button>
        </Row>
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

          </Col>
          {clips.map(
            (
              { name, url, isPlay, title, description, tags }: ClipProp,
              index: number
            ) => (
              <Col
                xs={12}
                md={8}
                lg={6}
                xl={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "250px",
                }}
                key={index}
              >
                <PreviewClip
                  url={url}
                  isPlay={isPlay}
                  index={index}
                  key={index}
                  handleClickSlide={handleClickSlide}
                  handleSetIsDrag={handleSetIsDrag}
                  isDrag={isDrag}
                  handleOpen={function (): void {
                  }}
                />
              </Col>
            )
          )}
        </Row>
        <EditPlaylist
          visible={isOpenEditPlaylist}
          title={playlist.title}
          previewImage={playlist.previewImage}
          description={playlist.description}
          tags={playlist.tags}
          handleClose={handleCloseEditPlaylist} />
      </Drawer>
    );
  }
  // return (
  //  { PlaylistDrawer }
};

export default ViewPlaylist;
