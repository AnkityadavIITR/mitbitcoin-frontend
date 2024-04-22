"use client"
import React,{useState} from "react";
import { Button } from "../ui/button";
import { Zap } from "lucide-react";

const AddSectionHero = ({ courseData }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className=" bg-[#f0eae4] py-[50px] px-[150px] mt-[72px]">
      <div className="container pl-0 pr-0 mx-auto flex w-full">
        <div className="flex flex-col gap-10 max-w-[50%]">
          <h1 className="text-[35px]  font-bold text-wrap">
            Run your Node in 10 minutes
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            accumsan, nunc sit amet efficitur convallis, augue orci placerat
            magna, eget congue orci massa a sapien.
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
            <source src="/path/to/video.mp4" type="video/mp4" />
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

export default AddSectionHero;
