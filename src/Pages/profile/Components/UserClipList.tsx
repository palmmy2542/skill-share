import { Col, Drawer, Row, Tabs } from "antd";
import React, { useState } from "react";
import { ImFilm, ImLock } from "react-icons/im";
import PreviewClip from "../../../Components/PreviewClip";
import { ClipProp, AllPlaylist } from "../../../interface";
import ClipFeed from "../../feed/Components/ClipFeed";
import PlayListIcon from "../../../Assets/playlist.png";

const { TabPane } = Tabs;

const UserClipList = ({
  clips,
  setClips,
  playlist,
  handleSelectPlaylist,
}: {
  clips: ClipProp[];
  setClips: React.Dispatch<React.SetStateAction<any>>;
  playlist: AllPlaylist[];
  handleSelectPlaylist: (
    title: string,
    description: string,
    previewImage: string,
    numberOfVideo: number,
    videoOwner: string
  ) => void;
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
            {playlist.map(
              (
                {
                  title,
                  description,
                  numberOfVideo,
                  videoOwner,
                  previewImage,
                }: AllPlaylist,
                index: number
              ) => (
                <Col
                  xs={8}
                  md={4}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "250px",
                  }}
                  key={index}
                  onClick={() =>
                    handleSelectPlaylist(
                      title,
                      description,
                      previewImage,
                      numberOfVideo,
                      videoOwner
                    )
                  }
                >
                  <img
                    src={previewImage}
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
