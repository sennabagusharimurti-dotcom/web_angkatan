'use client'
import React from 'react'

import Image from 'next/image'

import TitleImage from '@/assets/images/about-us/Title.svg'

const Hero = () => {
  return (
    <section
      id="about-hero"
      className="text-neutral-cs-10 relative flex min-h-[50vh] w-full flex-col items-center justify-end text-center lg:px-[90px]"
    >
      {/* {TITLE} */}
      <div className="relative inline-block w-full max-w-[325px] sm:max-w-[500px] lg:max-w-[760px]">
        <Image
          src={TitleImage}
          alt="Beyond the Identity"
          priority
          className="h-auto w-full object-contain"
          style={{ mixBlendMode: 'screen' }}
          width={800}
          height={151}
        />

        {/* {TULISAN TITLE} */}
        <p className="leading- mx-auto mt-3 w-full max-w-[800px] text-center font-sans text-[12px] leading-relaxed font-semibold text-white sm:text-base md:text-lg">
          More than just a name. This is the story, vision, and philosophy that shape our identity.
        </p>
      </div>
    </section>
  )
}

export default Hero
