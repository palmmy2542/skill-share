import React, { useEffect, useState } from "react";
import "./index.css";
import ReactHlsPlayer from "react-hls-player";
import { Avatar, Button, Typography } from "antd";
import { MessageOutlined, UserOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";

const PreviewClip = ({
  name,
  url,
  height = undefined,
  index,
  isPlay,
}: {
  name?: string | undefined;
  url: string;
  height?: string | undefined;
  index: number;
  isPlay?: boolean;
}) => {
  const [isShowControl, setIsShowControl] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpandable, setIsExpandable] = useState(true);

  function playVideo() {
    setIsPlaying(true);
  }

  function pauseVideo() {
    setIsPlaying(false);
  }

  return (
    <div
      id={"@" + name + "." + index.toString()}
      style={{
        background: "#000",
        display: "flex",
        alignItems: "center",
        position: "relative",
        width: "100%",
      }}
      onMouseOver={(e) => {
        e.preventDefault();
        if (!isPlaying && e.target instanceof HTMLVideoElement) {
          e.target.play();
          setIsPlaying(true);
        }
      }}
      onMouseLeave={(e) => {
        e.preventDefault();
        if (!isPlaying && e.target instanceof HTMLVideoElement) {
          e.target.pause();
          setIsPlaying(false);
        }
      }}
      // onClick={() => {
      //   if (!isPlaying) playVideo();
      //   else pauseVideo();
      //   setIsPlaying(!isPlaying);
      // }}
    >
      <ReactPlayer
        url={url}
        autoPlay={false}
        playing={isPlaying}
        controls={false}
        width="100%"
        height="100%"
        onMouseLeave={() => pauseVideo()}
        onMouseEnter={() => playVideo()}
        className={"clip"}
      ></ReactPlayer>
    </div>
  );
};

export default PreviewClip;
