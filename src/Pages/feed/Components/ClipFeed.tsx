import { Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import React, { useEffect, useRef, useState } from "react";
import Clip from "../../../Components/Clip";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";
import CommentSection from "../Containers/CommentSection";

const ClipFeed = ({ handleClose }: { handleClose: () => void }) => {
  const { clips, setClips } = useClipFeedContext();
  const ref = useRef<CarouselRef | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shouldPlay, setShouldPlay] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isFade, setIsFade] = useState(true);
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

  // useEffect(() => {
  //   const timeId = setTimeout(() => {
  //     const temp = clips.slice();
  //     temp.push({
  //       title: `First video ${temp.length + 1}`,
  //       description:
  //         "Ex veniam amet aute proident ut. In incididunt ut ut esse dolor. Est laborum nisi anim laborum anim sit in culpa magna commodo laborum fugiat voluptate mollit. Officia ad consequat consectetur aute adipisicing cupidatat pariatur adipisicing Lorem labore excepteur duis irure nisi. Aute anim est pariatur sint aliquip id aliqua. Eiusmod minim elit aliqua non culpa dolore.Et veniam ex culpa ipsum qui laboris. Nulla magna duis nostrud cupidatat. Dolore velit pariatur magna in Lorem est cillum elit laboris ut. Irure eiusmod dolore nulla eiusmod amet id elit mollit et proident in eu fugiat. Esse mollit ex aliquip aliquip nisi proident fugiat commodo voluptate duis veniam.",
  //       tags: ["game", "love", "comedy"],
  //       name: "TEST4",
  //       url: "https://skill-share-streaming-app.herokuapp.com/video/sample/index.m3u8",
  //       isPlay: false,
  //       comments: [
  //         { name: "Name_1", comment: "Comment_1" },
  //         { name: "Name_2", comment: "Comment_2" },
  //         { name: "Name_3", comment: "Comment_3" },
  //       ],
  //     });
  //     console.log("temp", temp);
  //     console.log("clips", clips);

  //     setClips(temp);
  //   }, 2000);

  //   return () => clearTimeout(timeId);
  // }, [clips]);

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
            handleClose={handleClose}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ClipFeed;
