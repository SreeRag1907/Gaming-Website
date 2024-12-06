import { useRef, useState } from 'react'

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [hasClicked, setHasClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedVideos, setLoadedVideos] = useState(0)

  const totalVideos = 3
  const nextVideoRef = useRef(null)

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`

  const handleMiniVideoPlayer = () => {
    setHasClicked(true)
    setCurrentIndex((prevIndex) => prevIndex + 1)
  }

  const handleVideoLoaded = () => {
    setLoadedVideos((prev) => prev + 1)
  }

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative h-dvh z-10 w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div onClick={handleMiniVideoPlayer} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
              <video
                ref={nextVideoRef}
                className="origin-center size-64 scale-150 object-cover object-center"
                src={getVideoSrc(currentIndex + 1)}
                type="video/mp4"
                autoPlay
                loop
                muted
                id="current-video"
                onLoadedData={handleVideoLoaded}
               
              ></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
