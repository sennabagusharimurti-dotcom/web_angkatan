'use client'
import React from 'react'
import Image from 'next/image'
import TitleImage from '@/assets/images/about-us/Title.svg'
import EvastraText from '@/assets/images/about-us/evastra-text.png'

const Hero = () => {
  return (
    <section
      id="about-hero"
      className="bg-blue-cs-40 text-neutral-cs-10 relative flex w-full flex-col items-center justify-center px-6 pt-28 pb-16 text-center sm:px-10 lg:px-[90px]"
    >
      {/* {TITLE} */}
      <div className="relative mb-12 inline-block w-full max-w-[325px] sm:max-w-[500px] md:mb-16 lg:max-w-[760px]">
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

      {/* {CONTAINER} */}
      {/* margine hapusen kalo dikasih gap */}
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 text-left md:flex-row md:items-center md:gap-12 lg:gap-16 my-5px md:my-[100px]">
        {/* KAPSUL LOGO */}
        <div className="flex w-full flex-shrink-0 justify-center md:w-auto">
          <div
            style={{
              background: 'linear-gradient(to bottom, #4888C800 0%, #9DBDBA 50%, #fefaa9 100%)'
            }}
            className="relative flex h-fit w-fit items-center justify-center overflow-hidden rounded-[50px] px-6 py-2 shadow-[0_12px_24px_rgba(0,0,0,0.2)] backdrop-blur-md"
          >
            <div className="relative flex items-center justify-center ">
              <Image
                src={EvastraText}
                alt="Evastra Logo"
                width={246}
                height={23}
                style={{
                  filter: 'drop-shadow(6px 8px 20px rgba(255, 255, 255, 0.6))'
                }}
                className="h-[25px] w-auto object-contain select-none sm:h-[35px] md:h-[53px]"
                priority
              />
            </div>
          </div>
        </div>

      {/* {TEKS KANAN} */}
        <div className="flex w-full max-w-[821px] flex-col gap-4 text-center font-sans text-base leading-relaxed text-[#FFFFFF] text-[14px] sm:text-base md:text-left md:text-xl font-semibold">
          {' '}
          <p>
            <span className="text-yellow-cs-20 font-black tracking-wider"></span> EVASTRA berasal dari gabungan kata{' '}
            <span className="text-yellow-cs-20 font-semibold">Evolve (berkembang)</span> dan{' '}
            <span className="text-yellow-cs-20 font-semibold">Astra (bintang)</span> yang melambangkan proses berkembang
            bersama menuju harapan dan tujuan yang lebih tinggi.
          </p>
          <p>
            Nama ini merepresentasikan perjalanan setiap individu untuk{' '}
            <span className="text-yellow-cs-20 font-semibold">terus bertumbuh</span>,{' '}
            <span className="text-yellow-cs-20 font-semibold">memperkuat karakter</span>, dan mengembangkan{' '}
            <span className="text-yellow-cs-20 font-semibold">kompetensi</span> melalui pengalaman, kolaborasi, dan
            kebersamaan.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
