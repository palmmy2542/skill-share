import { Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import React, { useRef, useState } from "react";
import { ClipProp } from "../../interface";
import Clip from "../Clip";
import { CommentDrawer } from "../Comment/index";

const ClipFeed = ({
  handleClose,
  currentIndex,
  setCurrentIndex,
  clips,
  setClips,
}: {
  handleClose: () => void;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  clips: any[];
  setClips: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const ref = useRef<CarouselRef | null>(null);
  const [visible, setVisible] = useState(false);
  const [isFade, setIsFade] = useState(true);
  const userId = localStorage.getItem("skillUserId");
  const handleChange = (from: number, to: number) => {
    const temp = clips.slice();
    temp.forEach((item) => (item.isPlay = false));
    temp[to].isPlay = true;
    setClips(temp);
    setCurrentIndex(to);
  };

  const handlePlay = () => {
    const temp = clips.slice();
    temp.forEach((item) => (item.isPlay = false));
    temp[currentIndex].isPlay = true;
    setClips(temp);
  };

  const handlePause = () => {
    const temp = clips.slice();
    temp.forEach((item) => (item.isPlay = false));
    temp[currentIndex].isPlay = true;
    setClips(temp);
  };

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
    <div style={{ overflow: "hidden" }}>
      <CommentDrawer
        videoId={clips[currentIndex].videoId}
        creatorId={clips[currentIndex].userId}
        userId={userId}
        visible={visible}
        setVisible={setVisible}
      />
      <Carousel
        infinite={false}
        ref={ref}
        dots={false}
        beforeChange={(from, to) => handleChange(from, to)}
        initialSlide={currentIndex}
      >
        {clips.map(
          (
            {
              videoId,
              username,
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
  );
};

export default ClipFeed;
