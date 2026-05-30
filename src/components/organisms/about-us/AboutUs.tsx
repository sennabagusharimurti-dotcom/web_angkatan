import React from 'react'

import Image from 'next/image'

import EvastraText from '@/assets/images/about-us/evastra-text.png'

const AboutUs = () => {
  return (
    <section
      id="about-us"
      className="text-neutral-cs-10 relative my-24 flex w-full flex-col items-center justify-center gap-18 px-6 text-center sm:px-10 lg:px-[90px]"
    >
      {/* {CONTAINER} */}
      {/* margine hapusen kalo dikasih gap */}
      <div className="my-5px mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 text-left md:my-[100px] md:flex-row md:items-center md:gap-12 lg:gap-16">
        {/* KAPSUL LOGO */}
        <div className="flex w-full flex-shrink-0 justify-center md:w-auto">
          <div
            style={{
              background: 'linear-gradient(to bottom, #4888C800 0%, #9DBDBA 50%, #fefaa9 100%)'
            }}
            className="relative flex h-fit w-fit items-center justify-center overflow-hidden rounded-[50px] px-6 py-2 shadow-[0_12px_24px_rgba(0,0,0,0.2)] backdrop-blur-md"
          >
            <div className="relative flex items-center justify-center">
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
        <div className="flex w-full max-w-[821px] flex-col gap-8 text-center font-sans text-base text-[14px] leading-relaxed font-semibold text-[#FFFFFF] sm:text-base md:text-left md:text-xl">
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

export default AboutUs
