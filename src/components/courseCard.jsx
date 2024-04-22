import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

const CourseCard = ({ onClick, data }) => {
  console.log("data", data.courseImage);

  return (
    <Card className="cursor-pointer max-w-[300px] h-[400px]" onClick={() => onClick(data.id)}>
      <div className="overflow-hidden h-[200px]">
        <Image
          src={data.courseImage}
          width={300}
          height={200}
          className="object-contain scale-125"
        />
      </div>

      <CardContent className="pt-2">
        <h1 className="text-black text-[16px] font-semibold max-w-[300px] text-wrap">
          {data.courseName}
        </h1>
        <p className="text-ellipsis line-clamp-2">{data.courseDescription}</p>
        <h3 className="text-slate-500 text-[14px]">{data.courseInstructor}</h3>
        <h4 className="font-extrabold">Price: {data.price}</h4>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
