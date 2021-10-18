import React, { useState } from "react";
import { Row, Col, Tabs, Drawer } from "antd";
import { ImFilm, ImLock } from "react-icons/im";
import PreviewClip from "../../../Components/PreviewClip";
import { ClipProp } from "../../../interface";
import ClipFeed from "../../feed/Components/ClipFeed";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";

const { TabPane } = Tabs;

const UserClipList = ({
  clips,
  setClips,
}: {
  clips: ClipProp[];
  setClips: React.Dispatch<React.SetStateAction<any>>;
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
      <Tabs defaultActiveKey="1" centered tabPosition={"bottom"}>
        <TabPane
          tab={
            <span>
              <ImFilm />
            </span>
          }
          key="1"
        />
        <TabPane
          tab={
            <span>
              <ImLock />
            </span>
          }
          key="2"
        />
      </Tabs>
      <Row gutter={[8, 8]}>
        {clips.map(
          (
            { name, url, isPlay, title, description, tags }: ClipProp,
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
