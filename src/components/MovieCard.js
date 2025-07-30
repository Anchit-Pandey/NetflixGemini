import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className="min-w-[200px] max-w-[200px] h-[300px] overflow-hidden rounded-md bg-gray-900 flex items-center justify-center">
      <img className="w-full h-full object-cover rounded-md" alt='Movie Card' src={IMG_CDN_URL + posterPath}/>
    </div>
  )
}

export default MovieCard
