import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import clsx from 'clsx';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';
import MusicPopup from './MusicPopup';

const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];

const Navbar = () => {
  const navContainerref = useRef(null);
  const audioElementRef = useRef(null);

  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const { y: currentScrollY } = useWindowScroll();
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerref.current.classList.remove('floating-nav');
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerref.current.classList.add('floating-nav');
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerref.current.classList.add('floating-nav');
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerref.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = (play) => {
    setIsAudioPlaying(play);
    setIsIndicatorActive(play);
    if (play) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  };

  return (
    <>
      <div
        ref={navContainerref}
        className="fixed top-4 inset-x-0 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex items-center justify-between size-full p-4">
            <div className="flex items-center gap-7">
              <img src="/img/logo.png" alt="logo" className="h-10 w-10 cursor-pointer" href="/" />
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
                onClick={() => toggleAudioIndicator(!isAudioPlaying)}
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
                    className={clsx('indicator-line', {
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

      <MusicPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onToggleMusic={toggleAudioIndicator}
      />
    </>
  );
};

export default Navbar;
