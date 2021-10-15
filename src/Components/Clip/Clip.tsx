import React, { useEffect, useState } from "react";
import "./index.css";
import ReactHlsPlayer from "react-hls-player";
import { Avatar, Button, Typography } from "antd";
import { MessageOutlined, UserOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";

let COUNTER = 0;

const Clip = ({
  name,
  url,
  height = undefined,
  index,
  isPlay,
  title,
  description,
  tags,
  handleOpenVideoComment,
}: {
  name?: string | undefined;
  url: string;
  height?: string | undefined;
  index: number;
  isPlay: boolean;
  title: string;
  description: string;
  tags: Array<string>;
  handleOpenVideoComment: () => void;
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
  // useEffect(() => {
  //   if (isPlay && COUNTER % 2 === 0) {
  //     COUNTER += 1;
  //   } else if (!isPlay) {
  //   }
  // }, [isPlay]);

  // console.log("@" + name + "." + index.toString());
  // console.log(isPlay);

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
        <span style={{ display: "inline-flex" }}>
          {tags.map((tag) => (
            <Typography.Paragraph style={{ color: "#FFF" }}>
              {`#${tag}`}
            </Typography.Paragraph>
          ))}
        </span>
      </div>
      <ReactPlayer
        url={url}
        autoPlay={false}
        controls={true}
        width="100%"
        height="100vh"
        playerRef={playerRef}
        className={"clip"}
      />
      {/* <ReactHlsPlayer
        src={url}
        autoPlay={false}
        controls={true}
        width="100%"
        height="100vh"
        playerRef={playerRef}
        className={"clip"}
      ></ReactHlsPlayer> */}
    </div>
  );
};

export default Clip;
