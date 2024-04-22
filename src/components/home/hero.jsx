"use client";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const Hero = () => {
  let sliderRef = useRef(null);
  const play = () => {
    sliderRef.slickPlay();
  };
  const pause = () => {
    sliderRef.slickPause();
  };
  let settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <div className="bg-[#ebcfaa] text-white py-10 px-[150px] mt-[72px]">
      <div className="container pr-0 pl-0 mx-auto flex">
        <div className="w-[40%] flex flex-col gap-y-5">
          <h1 className="text-[50px]">
            Welcome to <span className="font-bold bg-[#F7931A]">Bitcoin</span>
          </h1>
          <h2 className="text-[25px]">&quot;Freedom to Learn&quot;</h2>
          <Button className="w-[50%] rounded-none">Run now</Button>
        </div>
        <div className="w-[40%] mx-auto">
          <Slider
            ref={(slider) => (sliderRef = slider)}
            {...settings}
            className="flex w-[80%] mx-auto "
          >
            <Image src={"/Images/nostr.jpg"} width={300} height={200} className="w-[500px] height-[200px] scale-105"></Image>
            <Image
              src={"/Images/carousel-2.jpg"}
              width={300}
              height={200}
              className="w-[500px] height-[200px] scale-105"
            ></Image>
            <Image
              src={"/Images/carousel-3.jpg"}
              width={300}
              height={200}
              className="w-[500px] height-[200px] scale-105"
            ></Image>
            <Image
              src={"/Images/carousel-1.jpg"}
              width={300}
              height={200}
              className="w-[500px] height-[200px] scale-105"
            ></Image>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Hero;
