"use client"
import React,{useState} from "react";
import { Button } from "../ui/button";
import { Zap } from "lucide-react";

const CourseBanner = ({ courseData }) => {
  const [playing, setPlaying] = useState(false);
  console.log("this courseData", courseData)
  return (
    <div className=" bg-[#f0eae4] py-[50px] px-[150px] mt-[72px] ">
      <div className="container pl-0 pr-0 mx-auto flex w-full gap-8">
        <div className="flex flex-col gap-10 max-w-[50%]">
          <h1 className="text-[35px]  font-bold text-wrap">
            {courseData.courseName}
          </h1>
          <p>
           {courseData?.courseDescription}
          </p>
          <Button className="w-[250px] bg-customOrange hover:bg-customOrange hover:opacity-70">
            <Zap strokeWidth={1.25} size={20} className="mr-1" />
            <h2>Zap to view</h2>
          </Button>
        </div>
        <div className="flex flex-col max-w-[1/2]">
          <video
            width="640"
            height="360"
            controls
            autoPlay={playing}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source src={courseData.thumbnail} type="video/mp4" />
            <track
              src="/path/to/captions.vtt"
              kind="subtitles"
              srcLang="en"
              label="English"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default CourseBanner;
