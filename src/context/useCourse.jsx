"use client";
import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { data } from "@/data/data";

const CourseContext = createContext({
  coursesData: null,
});

const CourseProvider = ({ children }) => {
  const [coursesData, setCoursesData] = useState(data);

  const saveCourseData = (data) => {
    setCoursesData(data);
    localStorage.setItem("courses", JSON.stringify(coursesData));
  };

  const getCourseData = () => {
    if (coursesData) {
      return coursesData;
    } else {
      return data;
    }
  };

  const value = { coursesData, saveCourseData, getCourseData };
  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};

const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within an CourseProvider");
  }
  return context;
};

export default useCourse;
export { CourseContext, CourseProvider, useCourse };
