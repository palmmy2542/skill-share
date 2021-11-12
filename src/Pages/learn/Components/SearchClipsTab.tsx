import "../index.css";
import { Row, Col, Avatar } from "antd";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";
import PreviewClip from "../../../Components/PreviewClip";
import { ClipProp } from "../../../interface";
import BasicCarousel from "./BasicCarousel";

const SearchClipsTab = ({
  searchWord,
  clips,
  handleOpen,
  handleClickSlide,
  handleSetIsDrag,
  isDrag,
}: {
  searchWord: string;
  clips: Array<ClipProp>;
  handleOpen: () => void;
  handleClickSlide: (index: number) => void;
  handleSetIsDrag: (state: boolean) => void;
  isDrag: boolean;
}) => {
  const filteredClips = clips.filter((clip) => {
    return (
      clip.title.toLowerCase().includes(searchWord.toLowerCase()) ||
      clip.description.toLowerCase().includes(searchWord.toLowerCase())
    );
  });
  return (
    <div id="search-clips">
      <Row gutter={[12, 18]} style={{ padding: "0% 5%" }}>
        {filteredClips.map(
          (
            { name, url, isPlay, title, description, previewImage }: ClipProp,
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
    </div>
  );
};

export default SearchClipsTab;
