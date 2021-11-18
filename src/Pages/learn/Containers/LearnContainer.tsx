import { Button, Drawer, Input, Spin, Typography } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import BottomNav from "../../../Components/BottomNav/BottomNav";
import ViewPlaylist from "../../../Components/PlaylistFeed/ViewPlaylist";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";
import usePlaylistContext from "../../../Domains/Playlist/usePlaylist";
import useUserAuthenticationContext from "../../../Domains/UserAuthentication/useUserAuthentication";
import useUserDataContext from "../../../Domains/UserData/useUserDataContext";
import { AllPlaylist, ClipProp } from "../../../interface";
import { STATE } from "../../../utils";
import ClipFeed from "../../../Components/ClipFeed/index";
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
  const userId = localStorage.getItem("skillUserId");
  const { getAllPlaylist } = usePlaylistContext();
  const [isLoading, setIsLoading] = useState(true);

  const [playlist, setPlaylist] = useState<AllPlaylist[]>();

  const [selectedPlaylist, setSelectedPlaylist] = useState<AllPlaylist>();

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

  const { getAllVideo, getPreviewImageUrl, getStreamingUrl } =
    useClipFeedContext();

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
    const temp = clips.slice();
    temp.forEach((item) => (item.isPlay = false));
    temp[index].isPlay = true;
    setClips(temp);
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
    console.log("userId", userId);
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
                videoId: videoUploaded.videoId,
                title: videoUploaded.title,
                description: videoUploaded.description,
                url: getStreamingUrl(videoUploaded.videoId),
                previewImage: getPreviewImageUrl(videoUploaded.videoId),
                userId: videoUploaded.creator,
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
        setIsLoading(false);
      });
      getAllPlaylist(token).then((data) => {
        if (data) {
          setPlaylist([...data]);
        }
        setIsLoading(false);
      });
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
