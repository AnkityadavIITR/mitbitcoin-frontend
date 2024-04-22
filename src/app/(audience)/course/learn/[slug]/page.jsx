import React from 'react'
import SubscribeBanner from '@/components/home/subscription';
import Footer from '@/components/footer';
import CoursePlay from '@/components/learn/coursePlay';

const Learn = () => {
  return (
    <main>
      <CoursePlay/>
      <SubscribeBanner/>
      <Footer/>
    </main>
  )
}

export default Learn;
