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
  const { clips } = useClipFeedContext();

  return (
    <div style={{ overflow: "hidden" }}>
      {clips.map(({ name, url }, index) => (
        <Clip
          name={name}
          url={url}
          height={"100vh"}
          key={index}
          index={index}
        />
      ))}
    </div>
  );
};

export default ClipFeed;
