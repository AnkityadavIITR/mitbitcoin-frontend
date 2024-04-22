"use client"
import React,{useRef} from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import CourseCard from "../courseCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CourseCarousel = ({ data }) => {
  let sliderRef = useRef(null);
  const play = () => {
    sliderRef.slickPlay();
  };
  const pause = () => {
    sliderRef.slickPause();
  };
  let settings = {
    dots: true,
    speed: 2500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500
  };
  const router = useRouter();
  const handleClick = (id) => {
    console.log("click");
    router.push(`/course/${id}`);
  };

  return (
    <Slider ref={slider => (sliderRef = slider)} {...settings} className=" text-black">
      {data?.map((data, i) => {
        return <CourseCard onClick={handleClick} data={data} key={data.id} />;
      })}
    </Slider>
  );
};

export default CourseCarousel;
