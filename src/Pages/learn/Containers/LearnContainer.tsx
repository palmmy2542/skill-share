import { Button, Drawer, Input, Typography } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import BottomNav from "../../../Components/BottomNav/BottomNav";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";
import usePlaylistContext from "../../../Domains/Playlist/usePlaylist";
import useUserAuthenticationContext from "../../../Domains/UserAuthentication/useUserAuthentication";
import useUserDataContext from "../../../Domains/UserData/useUserDataContext";
import { ClipProp } from "../../../interface";
import ClipFeed from "../../feed/Components/ClipFeed";
import BasicCarousel from "../Components/BasicCarousel";
import Searching from "../Components/Searching";
import "../index.css";

const { Search } = Input;

const LearnContainer = () => {
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const {
    userData: { username },
  } = useUserDataContext();

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

  const handleSetIsDrag = (state: boolean) => {
    setIsDrag(state);
  };

  const handleClickSlide = (index: number) => {
    setCurrentIndex(index);
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
        console.log(data);
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
      // getRandomVideo(token, 5);
    }
  }, []);

  console.log(clips);

  return (
    <div id="search-page">
      <Search
        placeholder="search..."
        allowClear
        value={searchField ?? ""}
        onChange={onSearch}
        onFocus={() => setSearchShow(true)}
        addonAfter={
          searchShow && (
            <Button
              type="text"
              onClick={() => {
                setSearchField("");
                setSearchShow(false);
              }}
            >
              Cancel
            </Button>
          )
        }
      />
      {searchShow ? (
        <Searching
          searchField={searchField}
          clips={clips}
          handleOpen={handleOpen}
          handleClickSlide={handleClickSlide}
          handleSetIsDrag={handleSetIsDrag}
          isDrag={isDrag}
        />
      ) : (
        <div style={{ textAlign: "left" }}>
          <Typography.Title level={3}>Trending</Typography.Title>
          <BasicCarousel
            itemList={clipTrending}
            handleOpen={handleOpen}
            handleClickSlide={handleClickSlide}
            handleSetIsDrag={handleSetIsDrag}
            isDrag={isDrag}
          />
          <Typography.Title level={3}>Recommend</Typography.Title>
          <BasicCarousel
            itemList={clipRecommend}
            handleOpen={handleOpen}
            handleClickSlide={handleClickSlide}
            handleSetIsDrag={handleSetIsDrag}
            isDrag={isDrag}
          />
          <Typography.Title level={3}>Cooking</Typography.Title>
          <BasicCarousel
            itemList={clipCooking}
            handleOpen={handleOpen}
            handleClickSlide={handleClickSlide}
            handleSetIsDrag={handleSetIsDrag}
            isDrag={isDrag}
          />
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
    </div>
  );
};

export default LearnContainer;
