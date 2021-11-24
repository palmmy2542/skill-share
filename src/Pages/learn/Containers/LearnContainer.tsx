import { Drawer, Input, Spin } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import BottomNav from "../../../Components/BottomNav/BottomNav";
import ClipFeed from "../../../Components/ClipFeed/index";
import ViewPlaylist from "../../../Components/PlaylistFeed/ViewPlaylist";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";
import usePlaylistContext from "../../../Domains/Playlist/usePlaylist";
import useUserAuthenticationContext from "../../../Domains/UserAuthentication/useUserAuthentication";
import useUserDataContext from "../../../Domains/UserData/useUserDataContext";
import { AllPlaylist, ClipProp } from "../../../interface";
import { STATE } from "../../../utils";
import BasicCarousel from "../Components/BasicCarousel";
import Searching from "../Components/Searching";
import "../index.css";

const { Search } = Input;

const LearnContainer = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isShowPlaylist, setIsShowPlaylist] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedTrend, setSelectedTrend] = useState<number | null>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const userId = localStorage.getItem("skillUserId");
  const { getAllPlaylist } = usePlaylistContext();
  const { getAllUser } = useUserDataContext();
  const [isLoading, setIsLoading] = useState(true);

  const [playlist, setPlaylist] = useState<AllPlaylist[]>();

  const [selectedPlaylist, setSelectedPlaylist] = useState<AllPlaylist>();
  const username: string | null = localStorage.getItem("skillUsername");

  const { canAccessService } = useUserAuthenticationContext();
  const [clips, setClips] = useState<ClipProp[]>([]);
  const [selectedClips, setSelectedClips] = useState<ClipProp[]>([]);
  const [selectedTrendArray, setSelectedTrendArrary] = useState<ClipProp[]>([]);

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

  const { getAllVideo, getPreviewImageUrl, getStreamingUrl } =
    useClipFeedContext();

  const token = canAccessService();

  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = (index?: number) => {
    if (index !== undefined) setSelectedTrend(index);
    setVisible(true);
  };

  const handleClosePlaylist = () => {
    setIsShowPlaylist(false);
  };

  const handleSetIsDrag = (state: boolean) => {
    setIsDrag(state);
  };

  const handleClickSlide = (index: number, clips: ClipProp[]) => {
    const temp = clips.slice();
    temp.forEach((item) => (item.isPlay = false));
    temp[index]["isPlay"] = true;
    setSelectedTrendArrary(temp);
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

  const renderClips = (id: number | null) => {
    switch (id) {
      case 0:
        return clipTrending;
      case 1:
        return clipRecommend;
      case 2:
        return clipCooking;
    }
    return null;
  };

  const handleChange = (to: number) => {
    if (selectedTrendArray) {
      const temp = selectedTrendArray.slice();
      temp.forEach((item) => (item.isPlay = false));
      temp[to].isPlay = true;
      setSelectedClips(temp);
      setCurrentIndex(to);
    }
  };

  const handlePlay = () => {
    if (selectedTrendArray) {
      const temp = selectedTrendArray.slice();
      temp.forEach((item) => (item.isPlay = false));
      temp[currentIndex].isPlay = true;
      setSelectedClips(temp);
    }
  };

  const handlePause = () => {
    if (selectedTrendArray) {
      const temp = clips.slice();
      temp.forEach((item) => (item.isPlay = false));
      temp[currentIndex].isPlay = true;
      setSelectedClips(temp);
    }
  };

  useEffect(() => {
    if (token) {
      getAllVideo(token)
        .then((data) => {
          if (data) {
            const temp: ClipProp[] = data.map(
              (videoUploaded: any, index: number) => {
                return {
                  videoId: videoUploaded.videoId,
                  title: videoUploaded.title,
                  description: videoUploaded.description,
                  url: getStreamingUrl(videoUploaded.videoId),
                  previewImage: getPreviewImageUrl(videoUploaded.videoId),
                  isMe: videoUploaded.creatorName === username,
                  userId: videoUploaded.creator,
                  username: videoUploaded.creatorName,
                  isPlay: false,
                };
              }
            );
            setClips(temp);
          }
        })
        .then(() =>
          getAllPlaylist(token)
            .then((data) => {
              if (data) {
                setPlaylist([...data]);
              }
            })
            .then(() =>
              getAllUser().then((data) => {
                if (data) setUsers(data);
                setIsLoading(false);
              })
            )
        )
        .catch(() => setIsLoading(false));
    }
  }, []);

  return (
    <Spin spinning={isLoading} size={"large"}>
      <div id="search-page">
        <Search
          placeholder="search..."
          allowClear
          value={searchField ?? ""}
          onChange={onSearch}
          onFocus={() => setSearchShow(true)}
          style={{ width: "90%" }}
        />
        {searchShow && playlist ? (
          <Searching
            searchField={searchField}
            users={users}
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
                <BasicCarousel
                  itemList={clipTrending}
                  handleOpen={handleOpen}
                  handleClickSlide={handleClickSlide}
                  handleSetIsDrag={handleSetIsDrag}
                  isDrag={isDrag}
                  id={0}
                />
              </>
            )}
            {clipRecommend.length > 0 && (
              <>
                <BasicCarousel
                  itemList={clipRecommend}
                  handleOpen={handleOpen}
                  handleClickSlide={handleClickSlide}
                  handleSetIsDrag={handleSetIsDrag}
                  isDrag={isDrag}
                  id={1}
                />
              </>
            )}
            {clipCooking.length > 0 && (
              <>
                <BasicCarousel
                  itemList={clipCooking}
                  handleOpen={handleOpen}
                  handleClickSlide={handleClickSlide}
                  handleSetIsDrag={handleSetIsDrag}
                  isDrag={isDrag}
                  id={2}
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
            handleChange={handleChange}
            handlePause={handlePause}
            handlePlay={handlePlay}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            clips={selectedTrendArray}
            setClips={setClips}
          />
        </Drawer>
        {selectedPlaylist && (
          <ViewPlaylist
            state={selectedPlaylist.userId === userId ? STATE.EDIT : null}
            playlist={selectedPlaylist}
            visible={isShowPlaylist}
            handleClose={handleClosePlaylist}
          />
        )}
      </div>
    </Spin>
  );
};

export default LearnContainer;
