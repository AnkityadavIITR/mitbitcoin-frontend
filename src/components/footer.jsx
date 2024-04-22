import React from 'react'
import Link from 'next/link'

const Footer = () => {
    const dataLinks=[
        {
            id:"1",
            src:"/",
            content:"Terms"
            
        },
        {
            id:"2",
            src:"/",
            content:"Team"
        },
        {
            id:"3",
            src:"/about",
            content:"Blog"
        },
        {
            id:"4",
            src:"/",
            content:"Bitcoin"
        },
        {
            id:"5",
            src:"/",
            content:"Lightning"
        },
        {
            id:"6",
            src:"/",
            content:"Courses"
        },
        {
            id:"7",
            src:"/",
            content:"Nostr"
        },
    ]
  return (
    <div className='container pr-0 pl-0 mx-auto py-10'>
      <div className='flex justify-center gap-x-20'>
        <h1 className='text-customOrange font-secondary font-bold text-3xl'>Bitnote</h1>
        <div className='grid grid-cols-3 gap-x-20 gap-y-10'>
            {
                dataLinks.map((data)=>{
                    return <Link key={data.id} href={data.src} className='hover:underline hover:text-customOrange text-[16px]'>{data.content}</Link>
                })
            }
        </div>
      </div>
    </div>
  )
}

export default Footer
