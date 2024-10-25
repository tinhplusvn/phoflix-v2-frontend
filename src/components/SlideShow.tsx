import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/SlideShow.scss";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Box, Button, Chip, Skeleton, Typography } from "@mui/joy";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import _NavLink from "./common/_NavLink";
import SlideItem from "./SlideItem";

const SlideShow = () => {
  const items = useSelector((state: RootState) => state.movies.slideShow.items);

  return (
    <Box>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {items.length === 0 && (
          <SwiperSlide>
            <Skeleton animation="wave" variant="overlay" />
          </SwiperSlide>
        )}
        {items.length > 0 &&
          items.map((item: any, index: number) => (
            <SwiperSlide
              key={index}
              style={{
                backgroundImage: `url("${item.thumb_url}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
              }}
            >
              <SlideItem key={index} item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};

export default SlideShow;
