import React from 'react'
import Hero from '@/components/creator/hero'
import Footer from '@/components/footer'
import Earning from '@/components/creator/earning'
import CourseCarousel from '@/components/home/courseCarousel'
export const data = [
  {
    id: "1",
    imageUrl: "/Images/course.png",
    courseHeading: "The Web development Bootcamp 2024",
    courseInstructor: "Angela Yu",
    courseDescription:
      "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps",
    tag: "top-course",
    price: "4,500",
  },
  {
    id: "2",
    imageUrl: "/Images/course.png",
    courseHeading: "The Web development Bootcamp 2024",
    courseInstructor: "Angela Yu",
    courseDescription:
      "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps",
    tag: "top-course",
    price: "4,500",
  },
  {
    id: "3",
    imageUrl: "/Images/course.png",
    courseHeading: "The Web development Bootcamp 2024",
    courseInstructor: "Angela Yu",
    courseDescription:
      "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps",
    tag: "top-course",
    price: "4,500",
  },
  {
    id: "4",
    imageUrl: "/Images/course.png",
    courseHeading: "The Web development Bootcamp 2024",
    courseInstructor: "Angela Yu",
    courseDescription:
      "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps",
    tag: "top-course",
    price: "4,500",
  },
];
const Page = () => {
  return (
    <div>
      <Hero/>
      <Earning/>
      <div className="container pl-0 pr-0 mx-auto mt-10 flex flex-col gap-3">
        <h1 className="text-[40px] font-bold font-tertiary">Created courses</h1>
        <hr className='border-t-4 border-slate-600'/>
        <CourseCarousel data={data}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Page
