'use client';

import { ImagesSlider } from './ui/images-slider';
import phone from '@/images/phone.jpg';
import slide1 from '@/images/1002128114.jpg'
import slide2 from '@/images/1002128116.jpg'
import slide3 from '@/images/1002128141.jpg'
import { Button } from './ui/button';
import Link from 'next/link';


const slides = [
  { image: phone },
  { image: slide1 },
  { image: slide2 },
  { image: slide3 },
]

export default function HomeHero() {
  return (
    <ImagesSlider images={slides.map(slide => slide.image.src)} autoplay={true} direction='up' className='h-[80vh]'>
      <div className='absolute top-0 left-0 w-full h-full flex flex-col gap-4 md:gap-6 items-center justify-center z-50 text-white'>
        <h1 className='text-center text-4xl md:text-6xl px-2 font-black'>Discover the latest Trends</h1>
        <p className='text-[#dddddd] text-xl text-center'>Shop our curated collection of the hottest products across categories like phones, accessories, <br/> home, fashion, and more.</p>
        <Button size='lg' asChild>
          <Link href='/product'>
            Shop Now
          </Link>
        </Button>
      </div>
    </ImagesSlider>
  )
}