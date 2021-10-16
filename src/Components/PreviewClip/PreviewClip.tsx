import React, { useEffect, useState } from "react";
import "./index.css";
import ReactHlsPlayer from "react-hls-player";
import { Avatar, Button, Typography } from "antd";
import { MessageOutlined, UserOutlined } from "@ant-design/icons";

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
  const playerRef = React.useRef<HTMLVideoElement | null>(null);
  const [isShowControl, setIsShowControl] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpandable, setIsExpandable] = useState(true);

  function playVideo() {
    if (playerRef && playerRef.current) {
      playerRef.current.play();
    }
  }

  function pauseVideo() {
    if (playerRef && playerRef.current) {
      playerRef.current.pause();
    }
  }

  function toggleControls() {
    if (playerRef && playerRef.current) {
      console.log(playerRef.current.controls);
      playerRef.current.controls = !playerRef.current.controls;
    }
  }

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
      <ReactHlsPlayer
        src={url}
        autoPlay={false}
        controls={false}
        width="100%"
        height="100vh"
        playerRef={playerRef}
        onMouseLeave={() => pauseVideo()}
        onMouseEnter={() => playVideo()}
        className={"clip"}
      ></ReactHlsPlayer>
    </div>
  );
};

export default PreviewClip;
