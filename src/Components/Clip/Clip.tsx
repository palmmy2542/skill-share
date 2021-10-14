import React, { useEffect, useState } from "react";
import "./index.css";
import ReactHlsPlayer from "react-hls-player";
import { Avatar, Button, Typography } from "antd";
import { MessageOutlined, UserOutlined } from "@ant-design/icons";

const Clip = ({
  name,
  url,
  height = undefined,
  index,
  isPlay,
  title,
  description,
  tags,
}: {
  name?: string | undefined;
  url: string;
  height?: string | undefined;
  index: number;
  isPlay: boolean;
  title: string;
  description: string;
  tags: Array<string>;
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
  // console.log("@" + name + "." + index.toString());
  // console.log("isPlay", isPlay);
  // console.log("isPlaying", isPlaying);
  useEffect(() => {
    if (isPlay && !isPlaying) {
      setIsPlaying(true);
      // console.log("@" + name + "." + index.toString());
      // console.log("isPlay", isPlay);
      // console.log("isPlaying", isPlaying);
      // console.log("Play!!");
      // console.log("ref", playerRef.current);
      // playVideo();
    } else if (!isPlay && isPlaying) {
      pauseVideo();
      setIsPlaying(false);
    }
  }, [isPlay]);

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
      // onClick={() => {
      //   if (!isPlaying) playVideo();
      //   else pauseVideo();
      //   setIsPlaying(!isPlaying);
      // }}
    >
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

      <MessageOutlined
        style={{
          position: "absolute",
          bottom: 100,
          right: 30,
          color: "#FFF",
          fontSize: "40px",
          zIndex: 100,
        }}
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
        <span style={{ display: "inline-flex" }}>
          {tags.map((tag) => (
            <Typography.Paragraph style={{ color: "#FFF" }}>
              {`#${tag}`}
            </Typography.Paragraph>
          ))}
        </span>
      </div>
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
