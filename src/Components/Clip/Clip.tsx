import {
  CloseOutlined,
  LeftCircleOutlined,
  MessageOutlined,
  MoreOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Typography } from "antd";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import Fader from "../Fader/Fader";
import PlaylistFeed from "../PlaylistFeed";
import BottomMenu from "./BottomMenu";
import EditClip from "./EditClip";
import "./index.css";

const Clip = ({
  videoId,
  isFade,
  name,
  previewImage,
  url,
  height = undefined,
  index,
  isPlay,
  title,
  description,
  permission,
  isFirst,
  isLast,
  handleOpenVideoComment,
  handleNext,
  handleBack,
  handleFaderToggle,
  setIsFade,
  handlePlay,
  handlePause,
  handleClose,
}: {
  videoId: string;
  isFade: boolean;
  name: string;
  previewImage: string;
  url: string;
  height?: string | undefined;
  index: number;
  isPlay: boolean;
  title: string;
  description: string;
  permission: string;
  isFirst: boolean;
  isLast: boolean;
  handleOpenVideoComment: () => void;
  handleNext: () => void;
  handleBack: () => void;
  handlePlay: () => void;
  handlePause: () => void;
  handleFaderToggle: () => void;
  setIsFade: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}) => {
  const playerRef = React.useRef<ReactPlayer | null>(null);

  const [isExpandable, setIsExpandable] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [isShowEditClip, setIsShowEditClip] = useState(false);
  const [isShowPlaylist, setIsShowPlaylist] = useState(false);
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
    <div
      id={"@" + name + "." + index.toString()}
      style={{
        background: "#000",
        height: `${height && height}`,
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
      onMouseMove={(e: any) => {
        if (e.target.tagName === "VIDEO") setIsFade(true);
      }}
      onTouchEnd={(e: any) => {
        setIsFade(true);
      }}
    >
      <Fader isFade={isFade} setIsFade={setIsFade}>
        <div>
          <CloseOutlined
            style={{
              position: "absolute",
              top: "5%",
              left: "3%",
              color: "#FFF",
              fontSize: "32px",
              zIndex: 100,
              cursor: "pointer",
            }}
            onClick={handleClose}
          />

          <div
            style={{
              display: "flex",
              position: "absolute",
              top: "50%",
              justifyContent: "space-between",
              translate: "50% 0",
              width: "100%",
              zIndex: 1000,
            }}
          >
            {!isFirst && (
              <LeftCircleOutlined
                style={{
                  color: "#FFF",
                  fontSize: "48px",
                  zIndex: 1000,
                  cursor: "pointer",
                  position: "absolute",
                  left: 10,
                }}
                onClick={() => handleBack()}
              />
            )}
            {!isLast && (
              <RightCircleOutlined
                style={{
                  color: "#FFF",
                  fontSize: "48px",
                  zIndex: 1000,
                  cursor: "pointer",
                  position: "absolute",
                  right: 10,
                }}
                onClick={(e) => handleNext()}
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              textAlign: "center",
              zIndex: 100,
              right: 10,
              bottom: 100,
            }}
          >
            <MoreOutlined
              style={{
                // position: "absolute",
                // bottom: 230,
                // right: 30,
                color: "#FFF",
                width: "40px",
                height: "40px",
                fontSize: "40px",
                transform: "rotate(90deg)",
                borderRadius: "50%",
                border: "1px solid #FFF",
                marginBottom: "10px",
              }}
              onClick={() => handleOpenBottomMenu()}
            />
            <div
              style={{
                textAlign: "center",
              }}
            >
              <Avatar size={40}>{name[0]}</Avatar>
              <Typography style={{ color: "#FFF" }}>{name}</Typography>
            </div>
            <MessageOutlined
              style={{
                color: "#FFF",
                fontSize: "40px",
              }}
              onClick={() => handleOpenVideoComment()}
            />
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "10%",
              width: "70%",
              textAlign: "left",
              paddingLeft: "16px",
              zIndex: 100,
            }}
          >
            <Typography.Title style={{ color: "#FFF" }} level={5}>
              {title}
            </Typography.Title>
            <Typography.Paragraph
              style={{ color: "#FFF" }}
              ellipsis={{ rows: 2, expandable: isExpandable }}
              onClick={() => setIsExpandable(!isExpandable)}
            >
              {description}
            </Typography.Paragraph>
            {/* <span style={{ display: "inline-flex" }}>
              {tags.map((tag) => (
                <Typography.Paragraph style={{ color: "#FFF" }}>
                  {`#${tag}`}
                </Typography.Paragraph>
              ))}
            </span> */}
          </div>
        </div>
      </Fader>
      <ReactPlayer
        url={url}
        autoPlay={true}
        playing={isPlay}
        onPlay={() => handlePlay()}
        onPause={() => handlePause()}
        controls={true}
        width="100%"
        height="100vh"
        ref={playerRef}
        className={"clip"}
        loop
      />
      <EditClip
        videoId={videoId}
        visible={isShowEditClip}
        title={title}
        description={description}
        permission={permission}
        handleClose={handleCloseEditClip}
      />
      <PlaylistFeed
        currentVideoId={videoId}
        visible={isShowPlaylist}
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

export default Clip;
