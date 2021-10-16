import { Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import React, { useRef, useState } from "react";
import Clip from "../../../Components/Clip";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";
import CommentSection from "../Containers/CommentSection";

const ClipFeed = () => {
  const { clips, setClips } = useClipFeedContext();
  const ref = useRef<CarouselRef | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shouldPlay, setShouldPlay] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isFade, setIsFade] = useState(true);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const handleChange = (from: number, to: number) => {
    const temp = clips.slice();
    temp.forEach((item) => (item.isPlay = false));
    temp[to].isPlay = true;
    setShouldPlay(false);
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
    if (ref && ref.current) ref.current.next();
  };

  const handleBack = () => {
    if (ref && ref.current) ref.current.prev();
  };

  const handleFaderToggle = () => {
    setIsFade(!isFade);
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <CommentSection
        visible={visible}
        setVisible={setVisible}
        comments={clips[currentIndex].comments}
      />
      <Carousel
        infinite={false}
        ref={ref}
        dots={false}
        arrows={true}
        afterChange={() => setShouldPlay(true)}
        beforeChange={(from, to) => handleChange(from, to)}
      >
        {clips.map(({ name, url, isPlay, title, description, tags }, index) => (
          <Clip
            isFade={isFade}
            name={name}
            url={url}
            height={"100vh"}
            key={index + name}
            isFirst={index === 0}
            isLast={index === clips.length - 1}
            index={index}
            isPlay={isPlay}
            title={title}
            description={description}
            tags={tags}
            handleOpenVideoComment={handleOpenVideoComment}
            handleNext={handleNext}
            handleBack={handleBack}
            handleFaderToggle={handleFaderToggle}
            setIsFade={setIsFade}
            handlePlay={handlePlay}
            handlePause={handlePause}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ClipFeed;
