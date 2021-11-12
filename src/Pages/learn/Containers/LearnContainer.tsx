import { Button, Drawer, Input, Typography } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import BottomNav from "../../../Components/BottomNav/BottomNav";
import ViewPlaylist from "../../../Components/PlaylistFeed/ViewPlaylist";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";
import usePlaylistContext from "../../../Domains/Playlist/usePlaylist";
import useUserAuthenticationContext from "../../../Domains/UserAuthentication/useUserAuthentication";
import useUserDataContext from "../../../Domains/UserData/useUserDataContext";
import { AllPlaylist, ClipProp } from "../../../interface";
import ClipFeed from "../../feed/Components/ClipFeed";
import BasicCarousel from "../Components/BasicCarousel";
import Searching from "../Components/Searching";
import "../index.css";

const { Search } = Input;

const LearnContainer = () => {
  const [isShowPlaylist, setIsShowPlaylist] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const {
    userData: { username },
  } = useUserDataContext();
  const { playlist, getAllPlaylist } = usePlaylistContext();

  const [selectedPlaylist, setSelectedPlaylist] = useState<AllPlaylist>({
    title: "PLAYLIST_TITLE",
    description: "PLAY_DESCRIPTION",
    id: "",
    permission: "",
    userId: "",
    videoList: [""],
  });

  const { canAccessService } = useUserAuthenticationContext();
  const [clips, setClips] = useState<ClipProp[]>([]);
  const clipTrending = useMemo(
    () => clips.slice(0, Math.round(clips.length / 3)),
    [clips]
  );

  const clipRecommend = useMemo(
    () =>
      clips.slice(
        Math.round(clips.length / 3),
        Math.round(clips.length / 3) * 2
      ),
    [clips]
  );

  const clipCooking = useMemo(
    () => clips.slice(Math.round(clips.length / 3) * 2, clips.length),
    [clips]
  );

  const { getAllVideo, getRandomVideo, getStreamingUrl } = useClipFeedContext();

  const token = canAccessService();

  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClosePlaylist = () => {
    setIsShowPlaylist(false);
  };

  const handleSetIsDrag = (state: boolean) => {
    setIsDrag(state);
  };

  const handleClickSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleSelectPlaylist = ({
    title,
    description,
    id,
    permission,
    videoList,
    userId,
  }: AllPlaylist) => {
    setIsShowPlaylist(true);
    setSelectedPlaylist({
      title,
      description,
      id,
      permission,
      videoList,
      userId,
    });
  };

  const onSearch = (e: any) => {
    const value = e.target.value;
    setSearchField(value);
    if (value === "") {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
  };

  useEffect(() => {
    if (token) {
      getAllVideo(token).then((data) => {
        if (data) {
          const temp: ClipProp[] = data.map(
            ({ videoUploaded }: { videoUploaded: any }, index: number) => {
              return {
                title: videoUploaded.title,
                description: videoUploaded.description,
                url: getStreamingUrl(videoUploaded.videoId),
                name: `TEST ${index}`,
                isPlay: false,
                comments: [
                  { name: "Name_1", comment: "Comment_1" },
                  { name: "Name_2", comment: "Comment_2" },
                  { name: "Name_3", comment: "Comment_3" },
                ],
              };
            }
          );
          setClips(temp);
        }
      });
      getAllPlaylist(token).then((data) => console.log("data", data));
      // getRandomVideo(token, 5);
    }
  }, []);

  return (
    <div id="search-page">
      <Search
        placeholder="search..."
        allowClear
        value={searchField ?? ""}
        onChange={onSearch}
        onFocus={() => setSearchShow(true)}
        style={{ width: "90%" }}
      />
      {searchShow ? (
        <Searching
          searchField={searchField}
          clips={clips}
          handleOpen={handleOpen}
          handleClickSlide={handleClickSlide}
          handleSetIsDrag={handleSetIsDrag}
          isDrag={isDrag}
          playlist={playlist}
          handleSelectPlaylist={handleSelectPlaylist}
        />
      ) : (
        <div style={{ textAlign: "left" }}>
          {clipTrending.length > 0 && (
            <>
              <Typography.Title level={3}>Trending</Typography.Title>
              <BasicCarousel
                itemList={clipTrending}
                handleOpen={handleOpen}
                handleClickSlide={handleClickSlide}
                handleSetIsDrag={handleSetIsDrag}
                isDrag={isDrag}
              />
            </>
          )}
          {clipRecommend.length > 0 && (
            <>
              <Typography.Title level={3}>Recommend</Typography.Title>
              <BasicCarousel
                itemList={clipRecommend}
                handleOpen={handleOpen}
                handleClickSlide={handleClickSlide}
                handleSetIsDrag={handleSetIsDrag}
                isDrag={isDrag}
              />
            </>
          )}
          {clipCooking.length > 0 && (
            <>
              <Typography.Title level={3}>Cooking</Typography.Title>
              <BasicCarousel
                itemList={clipCooking}
                handleOpen={handleOpen}
                handleClickSlide={handleClickSlide}
                handleSetIsDrag={handleSetIsDrag}
                isDrag={isDrag}
              />
            </>
          )}
        </div>
      )}
      <BottomNav username={username} />
      <Drawer
        placement={"right"}
        visible={visible}
        closable={false}
        width={"100%"}
        keyboard
        destroyOnClose
        className={"ant-drawer-body"}
      >
        <ClipFeed
          handleClose={handleClose}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          clips={clips}
          setClips={setClips}
        />
      </Drawer>
      <ViewPlaylist
        state={null}
        playlist={selectedPlaylist}
        visible={isShowPlaylist}
        clips={[]}
        handleClose={handleClosePlaylist}
      />
    </div>
  );
};

export default LearnContainer;
