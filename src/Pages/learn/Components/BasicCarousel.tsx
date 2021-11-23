import { Carousel } from "antd";
import React from "react";
import { ClipProp } from "../../../interface";
import PreviewClip from "../../../Components/PreviewClip/index";

var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

const BasicCarousel = ({
  itemList,
  handleOpen,
  handleClickSlide,
  handleSetIsDrag,
  isDrag,
  id,
}: {
  itemList: Array<any>;
  handleOpen: (index?: number) => void;
  handleClickSlide: (index: number, clips: ClipProp[]) => void;
  handleSetIsDrag: (state: boolean) => void;
  isDrag: boolean;
  id: number;
}) => {
  return (
    <Carousel {...settings} draggable={true}>
      {itemList.map(({ url, permission, previewImage }: ClipProp, index) => (
        <div
          style={{
            background: "#000",
            display: "flex",
            alignItems: "center",
            position: "relative",
            width: "100%",
            cursor: "pointer",
          }}
          onClick={() => {}}
          key={index}
        >
          <PreviewClip
            previewImage={previewImage}
            isPrivate={permission === "private"}
            url={url}
            isPlay={false}
            index={index}
            key={index}
            height={"250px"}
            handleSetIsDrag={handleSetIsDrag}
            isDrag={isDrag}
            handleClickSlide={() => handleClickSlide(index, itemList)}
            handleOpen={() => handleOpen(id)}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default BasicCarousel;
