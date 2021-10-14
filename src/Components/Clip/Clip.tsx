import React, { useState } from "react";
import "./index.css";
import ReactHlsPlayer from "react-hls-player";
import { Avatar, Button, Typography } from "antd";
import { MessageOutlined, UserOutlined } from "@ant-design/icons";

const Clip = ({
  name,
  url,
  height = undefined,
  index,
}: {
  name?: string | undefined;
  url: string;
  height?: string | undefined;
  index: number;
}) => {
  const playerRef = React.useRef<HTMLVideoElement | null>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [isShowControl, setIsShowControl] = useState(false);

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
      id={'@'+name+"."+index.toString()}
      style={{
        background: "#000",
        height: `${height && height}`,
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 150,
          right: 25,
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

      <MessageOutlined
        style={{
          position: "absolute",
          bottom: 100,
          right: 30,
          color: "#FFF",
          fontSize: "40px",
        }}
      />
      <ReactHlsPlayer
        src={url}
        autoPlay={false}
        controls={true}
        width="100%"
        height="100vh"
        playerRef={playerRef}
        className={"clip"}
      ></ReactHlsPlayer>
    </div>
  );
};

export default Clip;
