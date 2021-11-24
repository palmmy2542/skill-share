import { Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import React, { useRef, useState } from "react";
import { ClipProp } from "../../interface";
import Clip from "../Clip";
import { CommentDrawer } from "../Comment/index";

const ClipFeed = ({
  handleClose,
  handleChange,
  handlePlay,
  handlePause,
  currentIndex,
  setCurrentIndex,
  clips,
  setClips,
}: {
  handleClose: () => void;
  handleChange: (to: number) => void;
  handlePlay: () => void;
  handlePause: () => void;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  clips: ClipProp[] | null;
  setClips: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const ref = useRef<CarouselRef | null>(null);
  const [visible, setVisible] = useState(false);
  const [isFade, setIsFade] = useState(true);
  const userId = localStorage.getItem("skillUserId");

  const handleOpenVideoComment = () => {
    setVisible(true);
  };

  const handleNext = () => {
    if (ref && ref.current) ref.current.goTo(currentIndex + 1);
  };

  const handleBack = () => {
    if (ref && ref.current) ref.current.goTo(currentIndex - 1);
  };

  const handleFaderToggle = () => {
    setIsFade(!isFade);
  };

  return (
    clips && (
      <div style={{ overflow: "hidden" }}>
        <CommentDrawer
          videoId={clips[currentIndex]?.videoId ?? "0"}
          creatorId={clips[currentIndex]?.userId ?? "0"}
          userId={userId}
          visible={visible}
          setVisible={setVisible}
        />
        <Carousel
          infinite={false}
          ref={ref}
          dots={false}
          beforeChange={(from, to) => handleChange(to)}
          initialSlide={currentIndex}
        >
          {clips.map(
            (
              {
                videoId,
                username,
                userId: creatorId,
                url,
                isPlay,
                title,
                description,
                previewImage,
                permission,
              }: ClipProp,
              index
            ) => (
              <Clip
                isMe={userId === creatorId}
                videoId={videoId}
                isFade={isFade}
                previewImage={previewImage}
                name={username}
                url={url}
                height={"100vh"}
                key={index + username}
                isFirst={index === 0}
                isLast={index === clips.length - 1}
                index={index}
                isPlay={isPlay}
                title={title}
                description={description}
                permission={permission}
                handleOpenVideoComment={handleOpenVideoComment}
                handleNext={handleNext}
                handleBack={handleBack}
                handleFaderToggle={handleFaderToggle}
                setIsFade={setIsFade}
                handlePlay={handlePlay}
                handlePause={handlePause}
                handleClose={handleClose}
              />
            )
          )}
        </Carousel>
      </div>
    )
  );
};

export default ClipFeed;
