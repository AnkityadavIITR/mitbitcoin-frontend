"use client";
import React, { useState } from "react";
import CourseAccardion from "../course/courseAccardion";
import Markdown from "./markdown";
import { Button } from "../ui/button";

const CoursePlay = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex mt-[100px]">
      <div className="flex  container mx-auto pl-0 pr-0 gap-10 ">
        <div className="w-[50%] flex flex-col gap-10">
          <video
            width="640"
            height="360"
            controls
            autoPlay={playing}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="mx-auto"
          >
            <source src="/path/to/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="flex justify-center">
            <Button className="rounded-none bg-customOrange hover:scale-x-105 font-secondary hover:bg-customOrange hover:opacity-75">
              Add note
            </Button>
          </div>
          <Markdown />
        </div>
        <div className="w-[40%] border">
          <CourseAccardion />
        </div>
      </div>
    </div>
  );
};

export default CoursePlay;
