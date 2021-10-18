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
}: {
  itemList: Array<any>;
  handleOpen: () => void;
  handleClickSlide: (index: number) => void;
  handleSetIsDrag: (state: boolean) => void;
  isDrag: boolean;
}) => {
  return (
    <Carousel {...settings} draggable={true}>
      {itemList.map(
        ({ name, url, isPlay, title, description, tags }: ClipProp, index) => (
          <div
            style={{
              background: "#000",
              display: "flex",
              alignItems: "center",
              position: "relative",
              width: "100%",
              cursor: "pointer",
            }}
            // onClick={handleOpen}
          >
            <PreviewClip
              url={url}
              isPlay={false}
              index={index}
              key={index}
              height={"250px"}
              handleClickSlide={handleClickSlide}
              handleSetIsDrag={handleSetIsDrag}
              isDrag={isDrag}
              handleOpen={handleOpen}
            />
          </div>
        )
      )}
    </Carousel>
  );
};

export default BasicCarousel;
