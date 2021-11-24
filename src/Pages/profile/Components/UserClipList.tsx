import { Col, Drawer, Row, Tabs } from "antd";
import React, { useState } from "react";
import { ImFilm } from "react-icons/im";
import PlayListIcon from "../../../Assets/playlist.png";
import ClipFeed from "../../../Components/ClipFeed/index";
import PreviewClip from "../../../Components/PreviewClip";
import { AllPlaylist, ClipProp } from "../../../interface";
import { getPreviewImageUrl } from "../../../utils";

const { TabPane } = Tabs;

const UserClipList = ({
  clips,
  setClips,
  isMe,
  playlist,
  handleSelectPlaylist,
}: {
  clips: ClipProp[];
  setClips: React.Dispatch<React.SetStateAction<any>>;
  isMe: boolean;
  playlist: AllPlaylist[] | undefined;
  handleSelectPlaylist: ({
    title,
    description,
    id,
    permission,
    videoList,
    userId,
  }: AllPlaylist) => void;
}) => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDrag, setIsDrag] = useState<boolean>(false);

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
    const temp = clips.slice();
    temp.forEach((item) => (item.isPlay = false));
    temp[index].isPlay = true;
    setCurrentIndex(index);
  };


  const handleChange = (to: number) => {
    if (clips) {
      const temp = clips.slice();
      temp.forEach((item) => (item.isPlay = false));
      temp[to].isPlay = true;
      setClips(temp);
      setCurrentIndex(to);
    }
  };

  const handlePlay = () => {
    if (clips) {
      const temp = clips.slice();
      temp.forEach((item) => (item.isPlay = false));
      temp[currentIndex].isPlay = true;
      setClips(temp);
    }
  };

  const handlePause = () => {
    if (clips) {
      const temp = clips.slice();
      temp.forEach((item) => (item.isPlay = false));
      temp[currentIndex].isPlay = true;
      setClips(temp);
    }
  };

  return (
    <>
      <Tabs defaultActiveKey="1" centered tabPosition={"top"}>
        <TabPane
          tab={
            <span>
              <ImFilm style={{ width: "32px", height: "32px" }} />
            </span>
          }
          key="1"
        >
          <Row gutter={[8, 8]}>
            {clips.map(
              ({ url, previewImage, permission }: ClipProp, index: number) => {
                const isPrivate = permission === "private" && isMe;
                const shouldShow =
                  (isMe && permission === "private") || permission === "public";
                return (
                  shouldShow && (
                    <Col
                      xs={12}
                      md={8}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "250px",
                      }}
                      key={index}
                    >
                      <PreviewClip
                        isPrivate={isPrivate}
                        previewImage={previewImage}
                        url={url}
                        isPlay={false}
                        index={index}
                        key={index}
                        handleClickSlide={() => handleClickSlide(index)}
                        handleSetIsDrag={handleSetIsDrag}
                        isDrag={isDrag}
                        handleOpen={handleOpen}
                      />
                    </Col>
                  )
                );
              }
            )}
          </Row>
        </TabPane>
        <TabPane
          tab={
            <span>
              <img
                alt="playlist-icon"
                src={PlayListIcon}
                style={{ width: "32px", height: "32px" }}
              />
            </span>
          }
          key="2"
        >
          <Row gutter={[8, 8]}>
            {playlist &&
              playlist.map(
                (
                  {
                    title,
                    description,
                    id,
                    permission,
                    userId,
                    videoList,
                  }: AllPlaylist,
                  index: number
                ) => (
                  <Col
                    xs={12}
                    md={8}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      height: "250px",
                      cursor: "pointer",
                    }}
                    key={index}
                    onClick={() =>
                      handleSelectPlaylist({
                        title,
                        description,
                        id,
                        permission,
                        userId,
                        videoList,
                      })
                    }
                  >
                    <img alt="preview" src={getPreviewImageUrl(videoList[0])} />
                  </Col>
                )
              )}
          </Row>
        </TabPane>
      </Tabs>

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
          handleChange={handleChange}
          handlePause={handlePause}
          handlePlay={handlePlay}
          handleClose={handleClose}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          clips={clips}
          setClips={setClips}
        />
      </Drawer>
    </>
  );
};

export default UserClipList;
