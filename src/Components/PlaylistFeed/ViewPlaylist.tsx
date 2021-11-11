import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Divider, Typography } from "antd";
import React from "react";
import Playlist from "./Playlist";
import PreviewClip from "../PreviewClip/PreviewClip";
import EditPlaylist from "./EditPlaylist";
import { ClipProp } from "../../interface";
import { useState } from "react";
import "./index.css";
import { STATE } from "./utils";

const ViewPlaylist = ({
  state,
  playlist,
  visible,
  clips,
  handleClose,
}: /*
   handleClickSlide,
   handleSetIsDrag,
   isDrag,*/
{
  state: string | null;
  playlist: {
    title: string;
    previewImage: string;
    description: string;
    numberOfVideo: number;
    videoOwner: string;
  };
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

  const renderTitle = () => {
    switch (state) {
      case STATE.SAVE: {
        return "Save to playlist";
      }
      case STATE.EDIT: {
        return "Edit playlist";
      }
      default: {
        return "Playlist";
      }
    }
  };

  const renderButton = () => {
    switch (state) {
      case STATE.SAVE: {
        return (
          <Button
            htmlType="submit"
            size="large"
            id="edit-playlist-form-button"
            style={{
              whiteSpace: "normal",
              height: "auto",
              marginBottom: "10px",
            }}
          >
            {renderTitle()}
          </Button>
        );
      }
      case STATE.EDIT: {
        return (
          <Button
            htmlType="submit"
            size="large"
            id="edit-playlist-form-button"
            style={{
              whiteSpace: "normal",
              height: "auto",
              marginBottom: "10px",
            }}
            onClick={handleOpenEditPlaylist}
          >
            Edit playlist
          </Button>
        );
      }
    }
  };

  return (
    <>
      <Drawer
        title={renderTitle()}
        headerStyle={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
        }}
        placement={"right"}
        onClose={handleClose}
        visible={visible}
        height="100%"
        width="100%"
        className={"save-to-playlist-drawer"}
      >
        <div className={"drawer-wrapper"}>
          <Row align="middle" gutter={[8, 8]} style={{ paddingTop: "16px" }}>
            <Col className="gutter-row setsize" span={12} xs={8}>
              <Playlist
                title={playlist.title}
                previewImage={playlist.previewImage}
              />
            </Col>
            <Col className="gutter-row" flex="auto" span={12} xs={16}>
              <Typography.Title level={4}>{playlist.title}</Typography.Title>
              <Typography.Paragraph>
                {playlist.description}
              </Typography.Paragraph>
            </Col>
          </Row>
          <Row justify="center">{renderButton()}</Row>
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
            ></Col>
            {clips.map(
              (
                { name, url, isPlay, title, description, tags,previewImage }: ClipProp,
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
                    previewImage={previewImage}

                    url={url}
                    isPlay={isPlay}
                    index={index}
                    key={index}
                    handleClickSlide={handleClickSlide}
                    handleSetIsDrag={handleSetIsDrag}
                    isDrag={isDrag}
                    handleOpen={function (): void {}}
                  />
                </Col>
              )
            )}
          </Row>
        </div>
      </Drawer>
      <EditPlaylist
        visible={isOpenEditPlaylist}
        title={playlist.title}
        previewImage={playlist.previewImage}
        description={playlist.description}
        handleClose={handleCloseEditPlaylist}
      />
    </>
  );
};

export default ViewPlaylist;
