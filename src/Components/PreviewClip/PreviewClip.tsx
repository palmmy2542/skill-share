import React, { useState } from "react";
import ReactPlayer from "react-player";
import useClipFeedContext from "../../Domains/ClipFeed/useClipFeed";
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
}: {
  name?: string | undefined;
  url: string;
  height?: string | undefined;
  previewImage: string;
  index: number;
  isPlay?: boolean;
  handleClickSlide?: (index: number) => void;
  handleSetIsDrag: (state: boolean) => void;
  isDrag: boolean;
  handleOpen: () => void;
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

  console.log(previewImage);

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
        if (typeof handleClickSlide === "function" && !isDrag) {
          handleClickSlide(index);
          handleOpen();
        }
      }}
    >
      <ReactPlayer
        url={url}
        muted
        previewImage={previewImage}
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
