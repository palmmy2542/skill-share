import { VideoCameraAddOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";
import "./index.css";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
};

const DropZone = ({
  file,
  handleAddVideo,
}: {
  file: any;
  handleAddVideo: (file: any) => void;
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/mp4",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      console.log(acceptedFiles);
      handleAddVideo(acceptedFiles);
    },
  });

  const thumbs = (
    <div
      style={{
        borderRadius: 2,
        border: "1px solid #eaeaea",
        marginBottom: 8,
        minWidth: 300,
        minHeight: 300,
        padding: 4,
        position: "relative",
        margin: "auto",
      }}
      key={file?.[0].name}
    >
      <div style={thumbInner}>
        {file === undefined || file?.length === 0 ? (
          <VideoCameraAddOutlined
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              fontSize: "36px",
              transform: "translateX(-50%)",
            }}
          />
        ) : (
          <ReactPlayer url={file?.[0].preview} controls style={img} playing />
        )}
      </div>
    </div>
  );

  useEffect(
    () => () => {
      if (file !== undefined && file?.length > 0)
        file.forEach((item: any) => URL.revokeObjectURL(item.preview));
    },
    [file]
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <aside
          className={"clip-wrapper"}
          style={{
            margin: `${
              file === undefined || file?.length === 0 ? "0" : "auto"
            }`,
          }}
        >
          {thumbs}
        </aside>
      </div>
    </section>
  );
};

export default DropZone;
