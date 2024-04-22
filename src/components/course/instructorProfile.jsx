import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const InstructorProfile = ({ instructor }) => {
    console.log("info about",instructor)
  return (
    <div className="py-12 px-[150px] mt-10 mb-10">
      <div className="container pr-0 pl-0 mx-auto flex justify-between max-w-4xl">
        <Image
          src={instructor?.image_url}
          width={200}
          height={200}
          className="border rounded-full image-contain"
          alt="imag url"
        />
        <div className="flex flex-col w-[50%] gap-5">
          <h1 className="text-customOrange text-[40px] font-bold font-tertiary">
            {instructor?.name}
          </h1>
          <p>{instructor?.about}</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
