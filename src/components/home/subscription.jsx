import React from "react";
import { Button } from "../ui/button";

const SubscribeBanner = () => {
  return (
    <div className="bg-[#ebcfaa] py-12 px-[150px] mt-10 mb-10">
      <div className="container pr-0 pl-0 mx-auto flex justify-center gap-10">
        <Button variant="outline" className="rounded-none w-[300px] font-secondary text-[25px] border-customOrange py-6 text-customOrange hover:bg-customOrange hover:text-white">Bitnote</Button>
        <h1 className="font-secondary text-white text-[36px] font-bold">Subscribe for Updates</h1>
      </div>
    </div>
  );
};

export default SubscribeBanner;
