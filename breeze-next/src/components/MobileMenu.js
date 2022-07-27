import Link from 'next/link'
import { useRouter } from 'next/router'

import BlogIcon from '../components/svgIcons/blogIcon'
import CarIcon from '../components/svgIcons/carIcon'
import FAQIcon from '../components/svgIcons/faqIcon'
import HomeIcon from '../components/svgIcons/homeIcon'
import InfoIcon from '../components/svgIcons/infoIcon'
import LocationIcon from '../components/svgIcons/locationpinIcon'


export default function MobileMenu({ refProp }) {

    const router = useRouter()

    return(
        <div  ref={refProp} id="mobileMenu" className="mobileMenu sm:hidden fixed w-auto p-3 h-auto right-0 flex flex-col justify-start z-[7] bg-white rounded-xl overflow-hidden transition-all gap-2 mr-[2rem] border border-graytwo">
            <Link href="/">
                <div className='mobilemenu-item'>
                    <div className='relative flex flex-col justify-center items-center text-black'>
                        <div className={'flex-col w-20 h-20 custom-radiobutton-mobilemenu-icon py-3.5 px-3 rounded-xl flex justify-center items-center ' + (router.pathname == '/' && 'active') + (router.pathname.startsWith('/') && ' home') }>
                        <HomeIcon />
                        <span className='custom-radiobutton-mobilemenu-text text-sm font-extrabold uppercase text-[0.625rem] leading-[1.125rem] mt-1.5'>Homepage</span>
                        </div>
                    </div>
                </div>
            </Link>
            <Link href="/cars">
                <div className='mobilemenu-item'>
                    <div className='relative flex flex-col justify-center items-center text-black'>
                        <div className={'flex-col w-20 h-20 custom-radiobutton-mobilemenu-icon py-3.5 px-3 rounded-xl flex justify-center items-center ' + (router.pathname == '/cars' && 'active') + (router.pathname.startsWith('/car') && ' car') }>
                            <CarIcon />
                            <span className='custom-radiobutton-mobilemenu-text text-sm font-extrabold uppercase text-[0.625rem] leading-[1.125rem] mt-1.5'>Our Cars</span>
                        </div>
                    </div>
                </div>
            </Link>
            <Link href="/locations">
                <div className='mobilemenu-item'>
                    <div className='relative flex flex-col justify-center items-center text-black'>
                        <div className={'flex-col w-20 h-20 custom-radiobutton-mobilemenu-icon py-3.5 px-3 rounded-xl flex justify-center items-center ' + (router.pathname == '/locations' && 'active') + (router.pathname.startsWith('/location') && ' location') }>
                            <LocationIcon />
                            <span className='custom-radiobutton-mobilemenu-text text-sm font-extrabold uppercase text-[0.625rem] leading-[1.125rem] mt-1.5'>Locations</span>
                        </div>
                    </div>
                </div>
            </Link>
            <Link href="/blog">
                <div className='mobilemenu-item'>
                    <div className='relative flex flex-col justify-center items-center text-black'>
                        <div className={'flex-col w-20 h-20 custom-radiobutton-mobilemenu-icon py-3.5 px-3 rounded-xl flex justify-center items-center ' + (router.pathname == '/blog' && 'active') + (router.pathname.startsWith('/blog') && ' blog') }>
                            <BlogIcon />
                            <span className='custom-radiobutton-mobilemenu-text text-sm font-extrabold uppercase text-[0.625rem] leading-[1.125rem] mt-1.5'>Blog</span>
                        </div>
                    </div>
                </div>
            </Link>

            <Link href="/about">
                <div className='mobilemenu-item'>
                    <div className='relative flex flex-col justify-center items-center text-black'>
                        <div className={'flex-col w-20 h-20 custom-radiobutton-mobilemenu-icon py-3.5 px-3 rounded-xl flex justify-center items-center ' + (router.pathname == '/about' && 'active') + (router.pathname.startsWith('/about') && ' about') }>
                            <InfoIcon  />
                            <span className='custom-radiobutton-mobilemenu-text text-sm font-extrabold uppercase text-[0.625rem] leading-[1.125rem] mt-1.5'>About</span>
                        </div>
                    </div>
                </div>
            </Link>
            
            <Link href="/faq">
                <div className='mobilemenu-item'>
                    <div className='relative flex flex-col justify-center items-center text-black'>
                        <div className={'flex-col w-20 h-20 custom-radiobutton-mobilemenu-icon py-3.5 px-3 rounded-xl flex justify-center items-center ' + (router.pathname == '/faq' && 'active') + (router.pathname.startsWith('/faq') && ' faq') }>
                            <FAQIcon  />
                            <span className='custom-radiobutton-mobilemenu-text text-sm font-extrabold uppercase text-[0.625rem] leading-[1.125rem] mt-1.5'>FAQ</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
