import { Drawer } from "antd";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router";
import ClipFeed from "../Components/ClipFeed";
import "../index.css";

const FeedContainer = (props: any) => {
  const { style } = useParams<{ style: string }>();
  const [visible, setVisible] = useState(false);

  // const url = useMemo(
  //   () => "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
  //   [videoId]
  // );

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <button onClick={() => setVisible(true)}>Open</button>
      <Drawer
        placement={"right"}
        visible={visible}
        closable={false}
        width={"100%"}
        keyboard
        destroyOnClose
        className={"ant-drawer-body"}
      >
        {/* <ClipFeed handleClose={handleClose} /> */}
      </Drawer>
    </div>
  );
};

export default FeedContainer;
