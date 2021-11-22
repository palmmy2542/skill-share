import { Button, Col, Drawer, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import useUserAuthenticationContext from "../../Domains/UserAuthentication/useUserAuthentication";
import { AllPlaylist, ClipProp } from "../../interface";
import {
  getAllVideoInPlaylist,
  getPlaylistPreviewImage,
  getStreamingUrl,
  STATE,
} from "../../utils";
import ClipFeed from "../ClipFeed/index";
import PreviewClip from "../PreviewClip/PreviewClip";
import EditPlaylist from "./EditPlaylist";
import "./index.css";
import Playlist from "./Playlist";
import { editPlaylist } from "./utils";

const ViewPlaylist = ({
  state,
  playlist,
  visible,
  videoId,
  handleClose,
}: /*
   handleClickSlide,
   handleSetIsDrag,
   isDrag,*/
{
  state: string | null;
  playlist: AllPlaylist;
  videoId?: string;
  visible: boolean;
  handleClose: () => void;
  /*
  handleClickSlide: (index: number) => void;
  handleSetIsDrag: (state: boolean) => void;
  isDrag: boolean;*/
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isShowClipFeed, setIsShowClipFeed] = useState(false);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [isOpenEditPlaylist, setIsOpenEditPlaylist] = useState<boolean>(false);
  const { canAccessService } = useUserAuthenticationContext();
  const token = canAccessService();
  const userId = localStorage.getItem("skillUserId");
  const history = useHistory();
  const { videoList } = playlist;
  const [allVideo, setAllVideo] = useState<ClipProp[]>([]);
  const handleSetIsDrag = (state: boolean) => {
    setIsDrag(state);
  };

  const handleClickSlide = (index: number) => {
    const temp = allVideo.slice();
    temp.forEach((item) => (item.isPlay = false));
    temp[index].isPlay = true;
    setCurrentIndex(index);
    setIsShowClipFeed(true);
    setAllVideo(temp);
  };

  const handleCloseClipFeed = () => {
    setIsShowClipFeed(false);
  };

  const handleOpenEditPlaylist = () => {
    setIsOpenEditPlaylist(true);
  };
  const handleCloseEditPlaylist = () => {
    setIsOpenEditPlaylist(false);
  };

  const renderTitle = () => {
    switch (state) {
      case STATE.SAVE: {
        return "Save to playlist";
      }
      case STATE.EDIT: {
        return "Edit playlist";
      }
      default: {
        return "Playlist";
      }
    }
  };

  const saveToPlaylist = () => {
    if (token && userId && videoId) {
      const temp = playlist.videoList;
      playlist.videoList.push(videoId);
      editPlaylist({
        token,
        userId,
        id: playlist.id,
        title: playlist.title,
        description: playlist.description,
        permission: playlist.permission === "public",
        videoList: temp,
      }).then(() => history.push("/"));
    }
  };

  const renderOnClickFunction = () => {
    switch (state) {
      case STATE.SAVE: {
        return saveToPlaylist;
      }
      case STATE.EDIT: {
        return handleOpenEditPlaylist;
      }
    }
  };

  const renderButton = () => {
    switch (state) {
      case STATE.SAVE: {
        return (
          <Button
            htmlType="submit"
            size="large"
            id="edit-playlist-form-button"
            style={{
              whiteSpace: "normal",
              height: "auto",
              marginBottom: "10px",
            }}
            onClick={renderOnClickFunction()}
          >
            {renderTitle()}
          </Button>
        );
      }
      case STATE.EDIT: {
        return (
          <Button
            htmlType="submit"
            size="large"
            id="edit-playlist-form-button"
            style={{
              whiteSpace: "normal",
              height: "auto",
              marginBottom: "10px",
            }}
            onClick={renderOnClickFunction()}
          >
            Edit playlist
          </Button>
        );
      }
    }
  };

  useEffect(() => {
    getAllVideoInPlaylist({ token: canAccessService(), videoList })?.then(
      (data) => {
        if (data && data?.[0]) {
          const temp: ClipProp[] = data.map(
            (videoUploaded: any, index: number) => {
              if (videoUploaded.length > 0) {
                return {
                  videoId: videoUploaded.videoId,
                  title: videoUploaded.title,
                  description: videoUploaded.description,
                  permission: videoUploaded.permission,
                  url: getStreamingUrl(videoUploaded.videoId),
                  userId: videoUploaded.creator,
                  username: videoUploaded.creatorName,
                  isPlay: false,
                };
              }
            }
          );
          const temp2 = temp.filter((item) => item !== undefined);
          if (temp2) setAllVideo(temp2);
        }
      }
    );
  }, [playlist]);

  return (
    <>
      <Drawer
        title={renderTitle()}
        headerStyle={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
        placement={"right"}
        onClose={handleClose}
        visible={visible}
        height="100%"
        width="100%"
        className={"save-to-playlist-drawer"}
      >
        <div className={"drawer-wrapper"}>
          <Row align="middle" gutter={[8, 8]} style={{ paddingTop: "16px" }}>
            <Col className="gutter-row setsize" span={12} xs={8}>
              <Playlist
                title={playlist.title}
                previewImage={getPlaylistPreviewImage(videoList?.[0])}
              />
            </Col>
            <Col className="gutter-row" flex="auto" span={12} xs={16}>
              <Typography.Title level={4}>{playlist.title}</Typography.Title>
              <Typography.Paragraph>
                {playlist.description}
              </Typography.Paragraph>
            </Col>
          </Row>
          <Row justify="center">{renderButton()}</Row>
          <Row gutter={[8, 8]}>
            {allVideo &&
              allVideo.length > 0 &&
              allVideo.map(
                (
                  {
                    name,
                    url,
                    isPlay,
                    title,
                    description,
                    permission,
                    videoId,
                  }: any,
                  index: number
                ) => (
                  <Col
                    xs={12}
                    md={8}
                    lg={6}
                    xl={4}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      height: "250px",
                    }}
                    key={index}
                  >
                    <PreviewClip
                      previewImage={getPlaylistPreviewImage(videoId)}
                      isPrivate={permission === "private"}
                      url={url}
                      isPlay={isPlay}
                      index={index}
                      key={index}
                      handleClickSlide={handleClickSlide}
                      handleSetIsDrag={handleSetIsDrag}
                      isDrag={isDrag}
                      handleOpen={function (): void {}}
                    />
                  </Col>
                )
              )}
          </Row>
        </div>
      </Drawer>
      <EditPlaylist
        visible={isOpenEditPlaylist}
        title={playlist.title}
        previewImage={getPlaylistPreviewImage(videoList?.[0])}
        description={playlist.description}
        handleClose={handleCloseEditPlaylist}
        permission={playlist.permission}
        videoList={playlist.videoList}
        userId={userId}
        playlistId={playlist.id}
      />
      {allVideo && (
        <Drawer
          placement={"right"}
          visible={isShowClipFeed}
          closable={false}
          width={"100%"}
          keyboard
          destroyOnClose
          className={"ant-drawer-body"}
        >
          <ClipFeed
            handleClose={handleCloseClipFeed}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            clips={allVideo}
            setClips={setAllVideo}
          />
        </Drawer>
      )}
    </>
  );
};

export default ViewPlaylist;
