import React from "react";
import CourseAccardion from "./courseAccardion";
import EnrollCard from "./enrollCard";

const CourseContent = ({courseData}) => {
  return (
    <div className="mt-10 mb-10">
      <div className="container pl-0 pr-0 mx-auto flex max-w-6xl ">
        <div className="w-[50%] ">
          <h1 className="text-[36px] font-extrabold font-primary">See what you&apos;ll learn</h1>
        </div>
        <div className="flex flex-col gap-y-10 w-[50%]">
          <h1 className="text-[24px] font-extrabold">Course Content</h1>
          <div className="border">
            <CourseAccardion data={courseData}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
