import { useEffect, useRef } from 'react'

function VideoContainer({ src }) {
  const vidRef = useRef()

  useEffect(() => {
    vidRef.current.src = src
  }, [src])

  return (
    <div className='flex'>
      <video
        height={1080}
        width={1920}
        controls='controls'
        preload='metadata'
        ref={ vidRef }
        alt=''
      >
        <source 
          src={src}
          type='video/mp4'
        />
      </video>
    </div>
  )
}

export default VideoContainer