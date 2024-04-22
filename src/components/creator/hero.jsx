"use client";
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Add from "@/svgs/Add";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="bg-[#ebcfaa]  py-12 px-[150px] mt-[72px] ">
      <div className="container mx-auto pl-0 pr-0 flex justifyp-center gap-20">
        <div className="flex-1">
          <Add />
        </div>
        <div className="flex flex-col gap-4 flex-1 my-auto">
          <h1 className="text-[60px]  mx-auto text-white w-[200px]">
            Teach 
          </h1>
          <h2 className="text-[60px]  mx-auto text-white w-[250px] bg-customOrange">Bitcoin</h2>
          <Button className="w-[200px] mx-auto" onClick={()=>{router.push("/creator/add")}}>Upload Course</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
