import "swiper/css/grid"

import { useRouter } from 'next/router'
import { AnimatePresence,motion } from 'framer-motion'
import { DefaultSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import NavLink from '../NavLink'
import MobileMenu from '../MobileMenu'
import Navigation from "../data/Navigation"

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
    
    const [selectedNavList, setSelectedNavList] = useState('')
    const [headerHeight, setHeaderHeight] = useState(null);
    const mobileMenu = useRef();
    const mainSection = useRef();
    const scrollY = useScrollPosition(60)

      useEffect(() => {
          var currentURL = window.location.href;
            
          
  
          const headerElmnt = document.querySelector('#header_wrapper');
          const headerHeight = headerElmnt.clientHeight
          setHeaderHeight(headerHeight)
  
          const onPageLoad = () => {
              mobileMenu.current.style.transform = 'translateY(' + headerHeight + 'px) translateX(calc(100% + 2rem))';
              mainSection.current.style.marginTop = headerHeight + 'px';
            };
        
            if (document.readyState === "complete") {
              onPageLoad();
            } else {
              window.addEventListener("load", onPageLoad);
              return () => window.removeEventListener("load", onPageLoad);
            }
      })
  
    const { user } = useAuth({ middleware: 'guest' })
  
    const handleMenuClick = (event) => {
      if (mobileMenu.current.style.transform.includes('translateX(calc(100% + 2rem))')) {
          mobileMenu.current.style.transform = 'translateY(' + headerHeight + 'px) translateX(0%)';
      } else {
          mobileMenu.current.style.transform = 'translateY(' + headerHeight + 'px) translateX(calc(100% + 2rem))';
      }
  };
  
    return (
      <div className="relative">
  
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
          <header id="header_wrapper" className='fixed w-full px-0 sm:px-8 top-0 left-0 z-[14] text-white bg-white'>
              <div className='hl container mx-auto flex items-center justify-between rounded-none sm:rounded-lg mt-0 sm:mt-5 h-20 duration-100 sm:duration-300 h-auto px-16'>
              <Link href="/">
                  <motion.div whileTap={{ scale: 0.9 }} className="w-auto h-full cursor-pointer">
                      <img src="/images/logo.png" alt="logo" className="object-contain object-center h-full w-auto"/>
                  </motion.div>
              </Link>
  
  
              

              <div className="">
                    {user ?
                        <Link href="/dashboard">
                            <a className="ml-4 text-sm text-gray-700 underline">
                                Dashboard
                            </a>
                        </Link>
                        :
                        <div className="flex flex-row items-center">
                            <Link href="/register">
                                <a className="text-base text-black underline font-semibold">
                                    Register
                                </a>
                            </Link>

                            <Link href="/login">
                                <div className="bg-primary rounded-full py-2 px-8 flex flex-row items-center ml-12 cursor-pointer">
                                    <span className="text-base text-white font-bold">Login</span>
                                    <i className="fa-solid fa-chevron-right fa-xs ml-1"></i>
                                </div>
                            </Link>
                        </div>
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
              </div>
              <div className="mt-1 sm:flex flex-row hidden w-full container mx-auto px-16">
                <nav id="main-nav" className="duration-300 flex flex-row w-full justify-between">

                    {Navigation.map((item, i ) => {
                        return (
                                <AnimatePresence initial={false} exitBeforeEnter>
                                <div className="flex flex-col relative navlink " key={i} onMouseEnter={()=> setSelectedNavList(item.title)} onMouseLeave={()=> setSelectedNavList('')}>
                                    <div className="navlink-item text-black pb-2.5 font-semibold cursor-pointer" >
                                        <span className="text-lg">{item.title}</span>
                                        <i className="fa-solid fa-chevron-down fa-xs ml-3 transition duration-150 ease-in-out"></i>
                                    </div>
                                    {selectedNavList == item.title && (
                                        <motion.ul
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute top-full min-w-[13rem] bg-white px-8 -left-8 list-none rounded-md">
                                            {item.navItems.map((link, j) => {
                                                return (
                                                    <li key={j}>
                                                        <NavLink href={`/` + link}>
                                                            <span>
                                                                {link}
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                )
                                            })}
                                        </motion.ul>
                                    )}
                                    </div>
                                </AnimatePresence>
                        )
                    })}

                    
                    {/* <NavLink href="/cars">
                        <span>Find a home</span>
                        <i className="fa-solid fa-chevron-down ml-3 transition duration-150 ease-in-out"></i>
                    </NavLink>
                    <NavLink href="/faq">
                        <span>Manage your home</span>
                        <i className="fa-solid fa-chevron-down ml-3 transition duration-150 ease-in-out"></i>
                    </NavLink>
                    <NavLink href="/locations">
                        <span>Support & opportunities</span>
                        <i className="fa-solid fa-chevron-down ml-3 transition duration-150 ease-in-out"></i>
                    </NavLink>
                    <NavLink href="/blog">
                        <span>About us</span>
                        <i className="fa-solid fa-chevron-down ml-3 transition duration-150 ease-in-out"></i>
                    </NavLink>
                    <NavLink href="/about">
                        <span>Contact us</span>
                        <i className="fa-solid fa-chevron-down ml-3 transition duration-150 ease-in-out"></i>
                    </NavLink> */}
                </nav>
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
  
          <footer className="flex flex-col justify-center items-center bg-primary text-white">
  
              <div className="container mx-auto px-16 py-12 grid grid-cols-footer w-full">
                    <div className="socials">
                        <div className="social-item">
                            <i className="fa-brands fa-facebook-f"></i>
                        </div>
                        <div className="social-item">
                            <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="social-item">
                            <i className="fa-brands fa-twitter"></i>
                        </div>
                        <div className="social-item">
                            <i className="fa-brands fa-youtube"></i>
                        </div>
                        <div className="social-item">
                            <i className="fa-brands fa-linkedin-in"></i>
                        </div>
                    </div>
                    <div className="grid grid-cols-footer-menu gap-4">
                        <div className="footer-menu-column">
                            <span>Working at Ghana Housing</span>
                        </div>
                        <div className="footer-menu-column">
                            <span>Legal</span>
                        </div>
                        <div className="footer-menu-column">
                            <span>Privacy policy</span>
                        </div>
                    </div>
              </div>
              <div className="copyright container mx-auto px-16 mb-8">
                    <span className="text-xs text-white font-medium">Copyright © 2022 Ghana Housing</span>
              </div>
  
          </footer>
  
      </div>
    )
  
  }

export default Layout
