import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='pt-36 px-10'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/3'>{overview}</p>
      <div>
        <button className='bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg'>▶Play</button>
        <button className='bg-gray-500 mx-2 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
