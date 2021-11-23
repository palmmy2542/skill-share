import { LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./index.css";

const PreviewClip = ({
  name,
  url,
  height = undefined,
  previewImage,
  index,
  isPlay,
  handleClickSlide,
  handleSetIsDrag,
  isDrag,
  handleOpen,
  isPrivate,
}: {
  name?: string | undefined;
  url: string;
  height?: string | undefined;
  previewImage: string;
  index: number;
  isPlay?: boolean;
  isPrivate: boolean;
  handleClickSlide?: () => void;
  handleSetIsDrag: (state: boolean) => void;
  isDrag: boolean;
  handleOpen: (id?: number) => void;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

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
        height: `${height ?? undefined}`,
        cursor: "pointer",
      }}
      onMouseDown={() => {
        handleSetIsDrag(false);
      }}
      onMouseMove={() => {
        if (!isDrag) handleSetIsDrag(true);
      }}
      onClick={() => {
        console.log(typeof handleClickSlide === "function");
        if (typeof handleClickSlide === "function" && !isDrag) {
          handleClickSlide();
          handleOpen();
        }
      }}
    >
      {isPrivate && (
        <LockOutlined
          style={{
            color: "#FFFF",
            position: "absolute",
            right: "2%",
            bottom: "2%",
          }}
        />
      )}
      <ReactPlayer
        url={url}
        muted
        // light={previewImage}
        autoPlay={true}
        playing={isPlaying}
        controls={false}
        width="100%"
        height="100%"
        onMouseLeave={() => pauseVideo()}
        onMouseEnter={() => playVideo()}
        className={"clip"}
      />
    </div>
  );
};

export default PreviewClip;
