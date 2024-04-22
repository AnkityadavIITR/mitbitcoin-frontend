import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

const EnrollCard = () => {
  return (
    <div className="-mt-[250px] w-[400px] mx-auto">
      <Card>
        <Image
          src={"/Images/course.png"}
          alt="courser-thumbnail"
          width={400}
          height={400}
          className="object-contain"
        ></Image>
        <CardContent className="mt-5 gap-5 flex flex-col">
          <h1 className="font-semibold font-tertiary">Subscribe to Bitnode top courses</h1>
          <Button variant="outline" className="w-full font-tertiary text-[14px] text-slate-700 border-customOrange rounded-none font-semibold hover:bg-customOrange hover:text-white ">Buy this Course</Button>
          

        </CardContent>
      </Card>
    </div>
  );
};

export default EnrollCard;
