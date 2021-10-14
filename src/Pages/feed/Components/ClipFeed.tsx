import { Carousel } from "antd";
import React, {
  TouchEvent,
  WheelEvent,
  useRef,
  useState,
  useEffect,
} from "react";
import Clip from "../../../Components/Clip";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";

const ClipFeed = () => {
  const { clips, setClips } = useClipFeedContext();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shouldPlay, setShouldPlay] = useState(true);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const handleChange = (from: number, to: number) => {
    const temp = clips.slice();
    temp[from].isPlay = false;
    temp[to].isPlay = true;
    console.log(from, to);
    setShouldPlay(false);
    setClips(temp);
    setCurrentIndex(to);
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Carousel
        dots={false}
        afterChange={() => setShouldPlay(true)}
        beforeChange={(from, to) => handleChange(from, to)}
      >
        {clips.map(({ name, url, isPlay, title, description, tags }, index) => (
          <Clip
            name={name}
            url={url}
            height={"100vh"}
            key={index}
            index={index}
            isPlay={isPlay}
            title={title}
            description={description}
            tags={tags}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ClipFeed;
