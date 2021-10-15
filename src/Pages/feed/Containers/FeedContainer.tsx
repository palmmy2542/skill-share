import React, { useMemo, useState } from "react";
import { useParams } from "react-router";
import Clip from "../../../Components/Clip";
import ClipFeed from "../Components/ClipFeed";
import CommentSection from "./CommentSection";

const FeedContainer = (props: any) => {
  const { userParam, videoId } =
    useParams<{ userParam: string; videoId: string }>();

  const url = useMemo(
    () => "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    [videoId]
  );

  return (
    <div>
      <ClipFeed />
    </div>
  );
};

export default FeedContainer;
