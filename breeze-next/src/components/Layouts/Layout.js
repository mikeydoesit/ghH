import "swiper/css/grid"

import { useRouter } from 'next/router'
import { AnimatePresence,motion } from 'framer-motion'
import { DefaultSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import NavLink from '../NavLink'
import MobileMenu from '../MobileMenu'

import { useState, useRef, useEffect } from 'react'
import { useToggle, useClickAway, useLockBodyScroll } from 'react-use'

import useScrollPosition from '@react-hook/window-scroll'
import { useAuth } from '@/hooks/auth'

const Layout = ({ children }) => {

    const router = useRouter()
    const url = `http://localhost:3000/${router.route}`
  
    
    const [locked, toggleLocked] = useToggle(false)
    useLockBodyScroll(locked)
  
    const ref = useRef(null)
  
    const [headerHeight, setHeaderHeight] = useState(null);
    const mobileMenu = useRef();
    const mainSection = useRef();
    const scrollY = useScrollPosition(60)

      useEffect(() => {
          var currentURL = window.location.href;
            
          if (router.route == '/' && window.screen.width < 640) {
              if (scrollY > 2) {
                  document.querySelector('#header_wrapper').classList.add('have-scrolled-first');
                  document.querySelector('#header_wrapper').classList.add('have-scrolled');
              } else {
                  document.querySelector('#header_wrapper').classList.remove('have-scrolled');
                  document.querySelector('#header_wrapper').classList.remove('have-scrolled-first');
              }
          }else if(router.route == '/' && window.screen.width >= 640){
              if (scrollY > 50 && scrollY < 350) {
                  document.querySelector('#header_wrapper').classList.add('have-scrolled-first');
                  document.querySelector('#header_wrapper').classList.remove('have-scrolled');
              } else if (scrollY > 350) {
                  document.querySelector('#header_wrapper').classList.add('have-scrolled');
                  document.querySelector('#header_wrapper').classList.remove('have-scrolled-first');
              } else {
                  document.querySelector('#header_wrapper').classList.remove('have-scrolled');
                  document.querySelector('#header_wrapper').classList.remove('have-scrolled-first');
              }
          }
  
          const headerElmnt = document.querySelector('#header_wrapper');
          const headerHeight = headerElmnt.clientHeight
          setHeaderHeight(headerHeight)
  
          const onPageLoad = () => {
              mobileMenu.current.style.transform = 'translateY(' + headerHeight + 'px) translateX(calc(100% + 2rem))';
              mainSection.current.style.transform = 'translateY(' + headerHeight + 'px)';
            };
        
            if (document.readyState === "complete") {
              onPageLoad();
            } else {
              window.addEventListener("load", onPageLoad);
              return () => window.removeEventListener("load", onPageLoad);
            }
  
            
      })
    const bgClass = router.pathname == '/' ? 'bg-transparent' : 'have-scrolled';
  
    const { user } = useAuth({ middleware: 'guest' })
  
    const handleMenuClick = (event) => {
      if (mobileMenu.current.style.transform.includes('translateX(calc(100% + 2rem))')) {
          mobileMenu.current.style.transform = 'translateY(' + headerHeight + 'px) translateX(0%)';
      } else {
          mobileMenu.current.style.transform = 'translateY(' + headerHeight + 'px) translateX(calc(100% + 2rem))';
      }
  };
  
    return (
      <div className="relative overflow-hidden">
  
          <DefaultSeo
              openGraph={{
                  type: 'website',
                  locale: '',
                  url,
                  description: '',
                  site_name: '',
                  images: [],
              }}
              canonical={url}
          />
          <MobileMenu refProp={mobileMenu} />
          <header id="header_wrapper" className={ 'fixed w-full px-0 sm:px-8 top-0 left-0 z-[14] text-white ' + bgClass }>
              <div className={ 'hl py-3.5 sm:py-3 container mx-auto flex items-center justify-between rounded-none sm:rounded-lg mt-0 sm:my-5 h-20 duration-100 sm:duration-300 h-auto ' + bgClass }>
              <Link href="/">
                  <motion.a whileTap={{ scale: 0.9 }} className="hidden sm:block aspect-[227/63] relative h-10 cursor-pointer">
                      <Image src="/assets/images/logo@2x.png" layout="fill" alt="logo" />
                  </motion.a>
              </Link>
              <Link href="/">
                  <motion.a className="sm:hidden aspect-[227/63] relative h-10 cursor-pointer">
                      <Image src="/assets/images/logo@2x.png" layout="fill" alt="logo" />
                  </motion.a>
              </Link>
  
  
              <>
              <nav id="main-nav" className="sm:mt-1 sm:mr-2 duration-300 sm:flex flex-col sm:flex-row absolute right-0 bottom-0 bg-white sm:bg-transparent hidden sm:relative">
                  <NavLink href="/cars">Our Cars</NavLink>
                  <NavLink href="/faq">FAQ</NavLink>
                  <NavLink href="/locations">Locations</NavLink>
                  <NavLink href="/blog">Blog</NavLink>
                  <NavLink href="/about">About</NavLink>
              </nav>

              <div className="px-6 py-4">
                    {user ?
                        <Link href="/dashboard">
                            <a className="ml-4 text-sm text-gray-700 underline">
                                Dashboard
                            </a>
                        </Link>
                        :
                        <>
                            <Link href="/login">
                                <a className="text-sm text-gray-700 underline">Login</a>
                            </Link>

                            <Link href="/register">
                                <a className="ml-4 text-sm text-gray-700 underline">
                                    Register
                                </a>
                            </Link>
                        </>
                    }
                </div>
  
              <div onClick={handleMenuClick} className='mobileMenuToggle flex flex-row sm:hidden justify-center items-center pointer-events-auto'>
                  <span className='text-white uppercase mr-2 font-extrabold sm:font-normal text-sm drop-shadow-md'>MENU</span>
                  <div className='mobileMenuToggleBtn w-8 h-8 px-2 py-2 bg-primary flex flex-col justify-center items-center rounded-xl'>
                      <span className='w-full h-[2px] bg-white block'></span>
                      <span className='w-full h-[2px] bg-white block my-[0.2rem]'></span>
                      <span className='w-full h-[2px] bg-white block'></span>
                  </div>
              </div>
              </>
              </div>
          </header>
          
              <AnimatePresence
                      exitBeforeEnter
                      initial={false}
                      onExitComplete={() => window.scrollTo(0, 0)}
              >
                  <div ref={mainSection}>
                    {children}
                  </div>
              </AnimatePresence>
  
          <footer className="flex flex-col justify-center items-center">
  
              <div className="sm:container sm:mx-auto flex mt-0 sm:mt-12 sm:mt-24 flex-col sm:flex-row w-full sm:w-auto">
                  <div className="w-full sm:w-4/12">
  
                      <div className="bg-black text-white sm:rounded-5xl py-9 sm:pt-10 sm:pb-8 px-4">
                          <div className="flex flex-row sm:flex-col items-center justify-center">
                              <div className="flex h-20 w-20">
                                  <img src="/assets/icons/map.svg" className="h-full sm:-mt-6" alt="" />
                                  <h1 className="hidden sm:block text-2xl font-bold ml-8">Get our <span className="text-primary">secret</span><br /> guide in your inbox</h1>
                              </div>
                              <form action="" className="w-full sm:mt-6 pl-8 pr-0 sm:px-8 relative flex flex-col">
                                  <h1 className="text-[1.4rem] leading-none font-black sm:hidden mb-2">
                                      Get our <span className="text-primary">secret</span><br />guide in your inbox
                                  </h1>
                                  <div className='flex flex-row border-b-white border-b-2 sm:border-0 justify-around items-center'>
                                      <input type="text" placeholder='your@email.com' className="bg-transparent w-5/6 sm:w-full sm:border-b-2 placeholder-white focus:outline-none font-bold text-left sm:text-center sm:pr-10 py-1.5 sm:py-1 text-sm leading-7 sm:text-xl" />
                                      <div className="hidden bg-primary hover:bg-white duration-300 text-black rounded-full w-8 h-8 sm:flex justify-center items-center">
                                          <i className="fa-solid fa-chevron-right"></i>
                                      </div>
                                      <div className='sm:hidden h-5 w-5 flex justify-center items-center'>
                                          <div className="w-full h-full rounded-full bg-primary hover:bg-white flex justify-center items-center duration-300">
                                              <i className="fa-solid fa-chevron-right fa-xs text-black"></i>
                                          </div>
                                      </div>
                                  </div>
                              </form>
                          </div>
                      </div>
  
                  </div>
                  <div className="w-full sm:w-8/12 px-6 sm:px-12 pt-6 sm:pt-0">
                      <ul className="grid sm:flex grid-cols-3 justify-between">
                          <li className="w-full sm:w-5/12">
                              <h1 className="font-black">Site</h1>
                              <ul className="columns-1 sm:columns-2 mt-4 font-extrabold sm:font-semibold list-none">
                                  <li>
                                      <Link href="/about"><a className="hover:text-primary">About Us</a></Link>
                                  </li>
                                  <li>
                                      <Link href="/cars"><a className="hover:text-primary">Rent a car</a></Link>
                                  </li>
                                  <li>
                                      <Link href="/cars"><a className="hover:text-primary">Our cars</a></Link>
                                  </li>
                                  <li>
                                      <Link href="/faq"><a className="hover:text-primary">FAQ</a></Link>
                                  </li>
                                  <li>
                                      <Link href="/contact"><a className="hover:text-primary">Contact</a></Link>
                                  </li>
                              </ul>
                          </li>
                          <li className="w-3/12">
                              <h1 className="font-black">Explore</h1>
                              <ul className="mt-4 font-extrabold sm:font-semibold list-none">
                                  <li>
                                      <Link href="/blog"><a className="hover:text-primary">Blog</a></Link>
                                  </li>
                                  <li>Testimonials</li>
                                  <li>Partners</li>
                                  <li>Campervans</li>
                              </ul>
                          </li>
                          <li className="w-3/12">
                              <h1 className="font-black">Legal</h1>
                              <ul className="mt-4 font-extrabold sm:font-semibold list-none">
                                  <li>Terms</li>
                                  <li>Conditions</li>
                                  <li>Copyright</li>
                              </ul>
                          </li>
                          <li className="hidden sm:inline w-[6rem]">
                              <h1 className="font-black">Find us at</h1>
                              <nav className="flex justify-center items-center mt-4">
                                  <a href="https://www.facebook.com/carsiceland/" target="_blank" className="social">
                                      <i className="fa-brands fa-facebook-f"></i>
                                  </a>
                                  <a href="https://www.instagram.com/carsiceland/" target="_blank" className="social mx-2">
                                      <i className="fa-brands fa-instagram"></i>
                                  </a>
                                  <a href="https://twitter.com/CarsIceland" target="_blank" className="social">
                                      <i className="fa-brands fa-twitter"></i>
                                  </a>
                              </nav>
                          </li>
                      </ul>
                  </div>
              </div>
  
              <div className="container mx-auto flex justify-between text-xs text-black text-opacity-50 mt-8 mb-16">
                  <p>© 2022 by Cars Iceland Booking Office</p>
                  <p>Be Local Buy Local ehf. 235 Keflavík Airport (Iceland) SSN: 680513-1630 / VAT: 114127</p>
              </div>
  
          </footer>
  
      </div>
    )
  
  }

export default Layout
