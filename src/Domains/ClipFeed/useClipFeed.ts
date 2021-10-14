import axios from "axios";
import constate from "constate";
import { useState } from "react";
import { AUTHENTICATION_HOST } from "../../const";
import useUserAuthenticationContext from "../UserAuthentication/useUserAuthentication";

const useClipFeed = () => {
  const [clips] = useState([
    {
      name: "TEST1",
      url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    },
    {
      name: "TEST2",
      url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    },
    {
      name: "TEST3",
      url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    },
    {
      name: "TEST4",
      url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    },
  ]);

  return {
    clips,
  };
};

const [ClipFeedProvider, useClipFeedContext] = constate(useClipFeed);

export { ClipFeedProvider, useClipFeedContext };

export default useClipFeedContext;
