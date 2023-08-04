import { ThumbUp } from "@mui/icons-material"
// import Image from "next/image"
import { useEffect, useRef, useState } from 'react'
import { forwardRef } from "react"

const Thumbnail = forwardRef(({ result, BASE_URL }, ref) => {
  // const BASE_URL = 'https://image.tmdb.org/t/p/original/'
  const [show, setShow] = useState('')
  const vidRef = useRef()

  useEffect(() => {
    vidRef.current.src = show
  }, [show])

  return (
    <div 
      ref={ref}
      className="p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50"
      onMouseOver={() => setShow(
        `${BASE_URL}${result.backdrop_path || result.poster.path}` || `${BASE_URL}${result.poster.path}`
      )}
      onMouseLeave={() => setShow('')}
    >
      {/* <Image 
        //layout='responsive'
        src={
          `${BASE_URL}${result.backdrop_path || result.poster.path}` || `${BASE_URL}${result.poster.path}`
        }
        height={1080}
        width={1920}
      /> */}
      <video
        height={1080}
        width={1920}
        controls='controls'
        preload='metadata'
        ref={ vidRef }
        alt=''
      >
        <source 
          src={show}
          type='video/mp4'
        />
      </video>
      <div className="p-2">
        <p className="truncate max-w-md">{result.overview}</p>
        <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">
          {result.title || result.original_name}
        </h2>
        <p className="flex items-center opacity-0 group-hover:opacity-100">
          {
            result.media_type && `${result.media_type} `
          }{' '}{
            result.release_date || result.first_air_date
          }{' '}
          <ThumbUp className='h-5 mx-2' /> {result.vote_count}
        </p>
      </div>
    </div>
  )
})

export default Thumbnail