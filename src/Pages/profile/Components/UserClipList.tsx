import { Col, Drawer, Row, Tabs } from "antd";
import React, { useState } from "react";
import { ImFilm } from "react-icons/im";
import PlayListIcon from "../../../Assets/playlist.png";
import PreviewClip from "../../../Components/PreviewClip";
import { AllPlaylist, ClipProp } from "../../../interface";
import { getPreviewImageUrl } from "../../../utils";
import ClipFeed from "../../feed/Components/ClipFeed";

const { TabPane } = Tabs;

const UserClipList = ({
  clips,
  setClips,
  playlist,
  handleSelectPlaylist,
}: {
  clips: ClipProp[];
  setClips: React.Dispatch<React.SetStateAction<any>>;
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
    setCurrentIndex(index);
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
              (
                {
                  name,
                  url,
                  isPlay,
                  title,
                  description,
                  previewImage,
                }: ClipProp,
                index: number
              ) => (
                <Col
                  xs={8}
                  md={8}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "250px",
                  }}
                  key={index}
                >
                  <PreviewClip
                    previewImage={previewImage}
                    url={url}
                    isPlay={false}
                    index={index}
                    key={index}
                    handleClickSlide={handleClickSlide}
                    handleSetIsDrag={handleSetIsDrag}
                    isDrag={isDrag}
                    handleOpen={handleOpen}
                  />
                </Col>
              )
            )}
          </Row>
        </TabPane>
        <TabPane
          tab={
            <span>
              <img
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
                    <img
                      src={getPreviewImageUrl(videoList?.[0])}
                      style={{ width: "100%", height: "100%" }}
                    />
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
