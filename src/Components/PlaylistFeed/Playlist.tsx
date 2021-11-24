import { Image } from "antd";
import React from "react";

const Playlist = ({
  title,
  previewImage,
}: {
  title: string;
  previewImage: string;
}) => {
  return (
    <Image src={previewImage} preview={false} width={"100%"} height={"100%"} />
  );
};

export default Playlist;
