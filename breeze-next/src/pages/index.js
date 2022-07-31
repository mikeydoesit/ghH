import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layouts/Layout'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper'

import 'swiper/css'
import 'swiper/css/effect-fade'

export default function Home() {
    
    const heroImages = ['/images/hero1.jpg', '/images/hero2.jpg','/images/hero3.jpg', '/images/hero4.jpeg']

    return (
        <>
            <Head>
                <title>Laravel</title>
            </Head>
            <Layout>
                <main>
                    <section className="h-[80vh] w-full relative">
                        <Swiper 
                            modules={[Autoplay, EffectFade]}
                            className="h-full w-full"
                            slidesPerView={1}
                            autoplay={{
                                delay: 15000,
                              }}
                            effect={"fade"}
                            >
                            {heroImages.map((image, i) => {
                                return (
                                    <SwiperSlide key={i} className="w-full h-full">
                                        <div className="w-full h-full relative">
                                            <img src={image} className="object-cover object-center w-full h-full" />
                                            <div className='w-full h-full bg-black absolute top-0 right-0 left-0 bottom-0 opacity-20'>
                                                <div className='container mx-auto'>
                                                    <h1></h1>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                        <div className="hero_overlay absolute top-0 bottom-0 left-0 right-0 bg-black opacity-10 z-10">
                        </div>
                        <div className="hero_cta container mx-auto px-16 max-w-full w-full h-full absolute top-0 left-0 z-[12] flex flex-col items-center justify-center text-white">
                            <h1 className="font-extrabold text-[3.5rem] leading-none text-center">Let's find the home<br/>that's perfect for you</h1>
                            <p className='text-[1.1rem] font-semibold my-4'>Search confidently through your trusted source of homes for sale or rent</p>
                            <div className='searchbox rounded-xl flex flex-row drop-shadow-lg bg-white max-w-[1080px]'>
                                <form className='p-1 w-full h-fit grid grid-cols-hero-searchbox'>
                                    <input type="text" placeholder="Enter a digital address, town, neighbourhood or city" className="text-black border-0 bg-transparent outline-none focus-within:outline-none focus-within:border-0 focus:outline-none focus:border-0 ring-0 focus-within:ring-0 focus:ring-0 w-full placeholder:text-gray-500 placeholder:italic pl-6"/>
                                    <buttom type="submit" className="rounded-xl bg-primary px-6 py-2.5 w-full font-semibold cursor-pointer">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                        <span className="ml-2 font-bold">Search</span>
                                    </buttom>
                                </form>
                            </div>
                        </div>
                    </section>
                </main>
            </Layout>
        </>
    )
}
