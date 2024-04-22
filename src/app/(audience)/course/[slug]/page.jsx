"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/course/Hero";
import { useParams } from "next/navigation";
import { data } from "@/app/(audience)/page";
import CourseContent from "@/components/course/courseContent";
import SubscribeBanner from "@/components/home/subscription";
import Footer from "@/components/footer";
import InstructorProfile from "@/components/course/instructorProfile";
import { useCourse } from "@/context/useCourse";
const Course = () => {
  const { slug } = useParams();
  const [courseData, setCourseData] = useState(null);
  const { getCourseData, saveCourseData } = useCourse();
  const coursesList = getCourseData();

  useEffect(() => {
    const res = coursesList.find((data) => data.id === slug);
    setCourseData(res);
  }, [slug]);

  console.log("result", courseData?.instructorInfo);
  return (
    <div className="m-0 p-0">
      {courseData && (
        <>
          <Hero courseData={courseData} />
          <CourseContent courseData={courseData?.sections} />
          <InstructorProfile instructor={courseData?.instructorInfo}  />
          <SubscribeBanner courseData={courseData} />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Course;
