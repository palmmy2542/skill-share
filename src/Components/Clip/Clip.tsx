import React from "react";
import "./index.css";
import ReactHlsPlayer from "react-hls-player";

const Clip = () => {
  const playerRef = React.useRef<HTMLVideoElement | null>(null);

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
      playerRef.current.controls = !playerRef.current.controls;
    }
  }

  return (
    <div
      style={{
        background: "#000",
      }}
      className={"clip"}
    >
      <ReactHlsPlayer
        src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
        autoPlay={false}
        controls={true}
        width="100%"
        height="auto"
        playerRef={playerRef}
        className={"clip"}
      ></ReactHlsPlayer>
    </div>
  );
};

export default Clip;
