"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import CourseCard from "@/components/courseCard";
import { useRouter } from "next/navigation";
import Hero from "@/components/home/hero";
import CourseCarousel from "@/components/home/courseCarousel";
import SubscribeBanner from "@/components/home/subscription";
import Footer from "@/components/footer";
import {useCourse} from "@/context/useCourse";

export default function Home() {
  const router = useRouter();
  const { getCourseData, saveCourseData } = useCourse();

  const data = getCourseData();

  const handleClick = (id) => {
    console.log("click");
    router.push(`/course/${id}`);
  };

  return (
    <main className="">
      <Hero />
      <div className="container  pl-0 pr-0 mx-auto mt-10 flex flex-col gap-3 ">
        <h1 className="text-[40px] font-bold font-tertiary">Top Courses</h1>
        <hr className="width-[2px]" />
        <CourseCarousel data={data} />
      </div>

      <div className="container pl-0 pr-0 mx-auto mt-10 flex flex-col gap-3">
        <h1 className="text-[40px] font-bold font-tertiary">
          Bitcoin for everyone
        </h1>
        <hr className="border-t-4 border-slate-600" />
        <CourseCarousel data={data} />
      </div>
      <div className="container pl-0 pr-0 mx-auto mt-10 flex flex-col gap-3">
        <h1 className="text-[40px] font-bold font-tertiary">Bitcoin for Dev</h1>
        <hr className="border-t-4 border-slate-600" />
        <CourseCarousel data={data} />
      </div>
      <div className="container pl-0 pr-0 mx-auto mt-10 flex flex-col gap-3">
        <h1 className="text-[40px] font-bold font-tertiary">
          Bitcoin for Lightening
        </h1>
        <hr className="border-t-4 border-slate-600" />
        <CourseCarousel data={data} />
      </div>
      <div className="container pl-0 pr-0 mx-auto mt-10 flex flex-col gap-3">
        <h1 className="text-[40px] font-bold font-tertiary">Nostr</h1>
        <hr className="border-t-4 border-slate-600" />
        <CourseCarousel data={data} />
      </div>
      <SubscribeBanner />
      <Footer />
    </main>
  );
}
