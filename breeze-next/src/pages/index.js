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
                    <section className="h-[80vh] w-full">
                        <Swiper 
                            modules={[Autoplay, EffectFade]}
                            className="h-full w-full"
                            slidesPerView={1}
                            autoplay={{
                                delay: 10000,
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
                    </section>
                </main>
            </Layout>
        </>
    )
}
