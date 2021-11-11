import {
  CloseOutlined,
  LeftCircleOutlined,
  MessageOutlined,
  MoreOutlined,
  RightCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Typography } from "antd";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import usePlaylistContext from "../../Domains/Playlist/usePlaylist";
import Fader from "../Fader/Fader";
import PlaylistFeed from "../PlaylistFeed";
import BottomMenu from "./BottomMenu";
import "./index.css";

const Clip = ({
  isFade,
  name,
  previewImage,
  url,
  height = undefined,
  index,
  isPlay,
  title,
  description,
  tags,
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
  isFade: boolean;
  name?: string | undefined;
  previewImage: string;
  url: string;
  height?: string | undefined;
  index: number;
  isPlay: boolean;
  title: string;
  description: string;
  tags: Array<string>;
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
  const [isShowControl, setIsShowControl] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpandable, setIsExpandable] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [isShowEditClip, setIsShowEditClip] = useState(false);
  const [isShowPlaylist, setIsShowPlaylist] = useState(false);
  const { playlist } = usePlaylistContext();
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

  console.log("previewImage", previewImage);
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
              position: "absolute",
              bottom: 150,
              right: 25,
              zIndex: 100,
            }}
          >
            <Avatar
              style={{
                width: "50px",
                height: "50px",
              }}
            >
              <UserOutlined
                style={{
                  color: "#FFF",
                  fontSize: "60px",
                }}
              />
            </Avatar>
            <Typography style={{ color: "#FFF" }}>{name}</Typography>
          </div>
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
          <MoreOutlined
            style={{
              position: "absolute",
              bottom: 250,
              right: 30,
              color: "#FFF",
              fontSize: "40px",
              zIndex: 100,
              transform: "rotate(90deg)",
              borderRadius: "50%",
              border: "1px solid #FFF",
            }}
            onClick={() => handleOpenBottomMenu()}
          />

          <MessageOutlined
            style={{
              position: "absolute",
              bottom: 100,
              right: 30,
              color: "#FFF",
              fontSize: "40px",
              zIndex: 100,
            }}
            onClick={() => handleOpenVideoComment()}
          />

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
        light={previewImage}
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
      <PlaylistFeed
        visible={isShowPlaylist}
        playlist={playlist}
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
