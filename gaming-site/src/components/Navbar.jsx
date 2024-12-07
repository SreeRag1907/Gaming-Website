import { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'
import clsx from 'clsx'

const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact']
const Navbar = () => {
  const navContainerref = useRef(null)
  const audioElementRef = useRef(null)

  const [isIndicatorActive, setIsIndicatorActive] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)


  const toggleAudioIndicator = () => {
   setIsAudioPlaying((prev) => !prev)
   setIsIndicatorActive((prev) => !prev)
  }

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play()
    } else {
      audioElementRef.current.pause()
    }
  })


  return (
    <div
      ref={navContainerref}
      className="fixed top-4 inset-x-0  z-50 h-16  border-none transition-all duration-700 sm:inset-x-6 "
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2 ">
        <nav className="flex items-center justify-between size-full p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="h-10 w-10" />
            <Button
              title="Products"
              leftIcon={<TiLocationArrow />}
              id="product-button"
              containerClass="bg-blue-50 md:flex hidden item-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
