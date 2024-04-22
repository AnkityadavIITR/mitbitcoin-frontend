import React from "react";
import { DollarSign } from "lucide-react";

const Earning = ({ data }) => {
  return (
    <div className="mt-10">
      <div className="container mx-auto pl-0 pr-0 ">
        <h1 className="text-[40px] font-bold font-tertiary">Your Earnings</h1>
        <hr className="border-t-4 border-slate-600" />

        <div className="flex  mt-5 justify-center">
          <h1 className="text-[60px] font-bold font-tertiary text-customOrange flex">
            <DollarSign strokeWidth={1.5} size={40} className="my-auto" />{" "}
            <span>5,000</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Earning;
