'use client'

import React, { useEffect } from 'react'

import Image from 'next/image'

import { createPortal } from 'react-dom'

import Instagram from '@/components/atoms/button/InstagramButtonLink'
import LinkedInButtonLink from '@/components/atoms/button/LinkedInButtonLink'
import SpotifyEmbed from '@/components/molecules/SpotifyEmbed'

import ProfileImage from './image.jpg'

type MemberPopupProps = {
  isOpen: boolean
  onClose: () => void
}

const MemberPopup = ({ isOpen, onClose }: MemberPopupProps) => {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    // OVERLAY: Soft grain/noise aesthetic with deep dark blue tint
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 pt-24 pb-8 transition-all duration-300 sm:pt-28">
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-hidden px-4">
      <button
        type="button"
        aria-label="Close member detail"
        onClick={onClose}
        className="absolute inset-0 bg-[#000040]/40 backdrop-blur-sm transition-opacity duration-300"
        style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '4px 4px' }}
      />

      {/* CONTAINER: Scrapbook / Indie Portfolio Style
        - Solid cream paper background instead of glassmorphism
        - Brutalist thick borders and solid Navy Blue drop shadow
        - Playful floating elements inside
      */}
      <div className="relative z-10 w-full max-w-[640px] animate-[member-popup-show_300ms_cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden rounded-2xl border-[3px] border-neutral-900 bg-[#FAF8F5] p-6 text-neutral-900 shadow-[12px_12px_0px_#000080] transition-all sm:p-8">
        
        {/* DECORATIVE: Floating hand-drawn stars/sparkles (CSS simulation) */}
        <div className="absolute top-4 left-4 text-2xl animate-pulse">✨</div>
        <div className="absolute top-24 right-8 text-xl opacity-50">✦</div>
        <div className="absolute bottom-32 left-6 text-xl text-[#000080] opacity-30">✶</div>

        {/* CLOSE BUTTON: Sticker style 
          - Playful bounce on hover, thick borders
        */}
      <div className="border-neutral-cs-10/40 bg-blue-cs-40/90 relative z-10 h-[100dvh] max-h-[100dvh] w-full max-w-[640px] animate-[member-popup-show_280ms_cubic-bezier(0.16,1,0.3,1)] overflow-y-auto rounded-2xl border p-6 text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all sm:p-8">
        <button
          type="button"
          aria-label="Close member detail"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border-[2.5px] border-neutral-900 bg-[#000080] text-lg font-bold text-white shadow-[3px_3px_0px_#000080] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:bg-neutral-900 hover:shadow-none active:scale-95"
          className="border-neutral-cs-10/30 absolute top-5 right-5 z-20 flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium tracking-normal text-neutral-400 transition-all duration-200 hover:border-white/50 hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white/20 focus:outline-none active:scale-95"
        >
          ✕
        </button>

        {/* IMAGE WRAPPER: Polaroid / Photo Print Style
          - Tilted frame, masking tape effect, thick bottom padding
        */}
        <div className="relative mb-8 mt-2 mx-auto w-[90%] sm:w-[80%]">
          {/* Masking tape top center */}
          <div className="absolute -top-4 left-1/2 z-20 h-7 w-24 -translate-x-1/2 rotate-[3deg] bg-yellow-100/80 shadow-sm border border-yellow-200/50 backdrop-blur-md"></div>
          
          <div className="group relative overflow-hidden rounded-sm border-[3px] border-neutral-900 bg-white p-3 pb-12 shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-transform duration-300 hover:rotate-[-2deg] hover:scale-[1.02]">
            <Image 
              src={ProfileImage} 
              alt="Profile Image" 
              className="h-80 w-full object-cover object-center grayscale-[20%] contrast-125 transition-all duration-500 group-hover:grayscale-0" 
            />
            {/* Cute hand-written doodle arrow/text simulation on the polaroid */}
            <p className="absolute bottom-3 right-4 font-['Instrument_Serif',_serif] text-xl italic text-neutral-500">
              me! ✌️
            </p>
          </div>
        </div>

        {/* TYPOGRAPHY HIERARCHY: Bold, Y2K / Magazine Print Vibe */}
        <div className="relative text-center sm:text-left mb-6">
          <h2 className="font-['Clash_Display',_sans-serif] text-4xl sm:text-5xl font-black uppercase tracking-tight text-neutral-900 drop-shadow-[2px_2px_0px_#A5B4FC]">
            Jude Athala <br className="hidden sm:block" /> Yazid Sari
          </h2>
          
          {/* Tag style info block */}
          <div className="mt-4 inline-block -rotate-1 rounded-md border-2 border-neutral-900 bg-[#000080] px-3 py-1.5 shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-transform hover:rotate-1">
            <p className="font-mono text-sm font-bold tracking-widest text-white uppercase">
              📌 5027251098 • Tangerang
            </p>
          </div>
        </div>

        {/* SOCIAL BUTTONS: Magnetic Sticker Interaction */}
        <div className="mt-6 flex justify-center sm:justify-start gap-4">
          <div className="group cursor-pointer rounded-xl border-2 border-neutral-900 bg-white p-1.5 shadow-[4px_4px_0px_#000080] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000080] active:translate-y-0 active:shadow-none">
            <Instagram username="Judeatha" />
          </div>
          <div className="group cursor-pointer rounded-xl border-2 border-neutral-900 bg-white p-1.5 shadow-[4px_4px_0px_#000080] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000080] active:translate-y-0 active:shadow-none">
        <div className="border-neutral-cs-10/30 group mb-6 overflow-hidden rounded-xl border bg-black/20">
          <Image
            src={ProfileImage}
            alt="Profile Image"
            className="h-96 w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <div className="pr-10">
          <h2 className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            Jude Athala Yazid Sari
          </h2>
          <p className="text-neutral-cs-10/80 mt-1.5 text-xs font-medium tracking-widest uppercase">
            5027251098 &bull; Tangerang
          </p>
        </div>

        <div className="mt-5 flex gap-2.5 transition-all duration-200">
          <div className="rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(225,48,108,0.3)]">
            <Instagram username="Judeatha" />
          </div>
          <div className="rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(0,119,181,0.2)]">
            <LinkedInButtonLink username="jude-athala" />
          </div>
        </div>

        {/* INFORMATION GRID: Hand-drawn Sticky Notes / Index Cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {/* Card 1: Wavy/Tilted Blue Note */}
          <div className="relative rotate-[-1deg] rounded-xl border-[3px] border-neutral-900 bg-[#E5F0FF] p-5 shadow-[5px_5px_0px_#000080] transition-transform duration-200 hover:rotate-1 hover:scale-[1.02]">
            <div className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-900 bg-red-400">📍</div>
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500">Hobi</p>
            <p className="mt-2 font-['Space_Grotesk',_sans-serif] text-lg font-bold text-neutral-900">
              Bermain Sepak Bola ⚽
            </p>
          </div>
          
          {/* Card 2: Tilted Yellow Note */}
          <div className="relative rotate-[1deg] rounded-xl border-[3px] border-neutral-900 bg-[#FFF5CD] p-5 shadow-[5px_5px_0px_#000080] transition-transform duration-200 hover:rotate-[-1deg] hover:scale-[1.02]">
             {/* Small tape decoration */}
            <div className="absolute -top-3 right-4 h-6 w-12 rotate-[-5deg] bg-white/60 backdrop-blur-sm border border-neutral-200 shadow-sm"></div>
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500">Fun Fact</p>
            <p className="mt-2 font-['Space_Grotesk',_sans-serif] text-base font-semibold text-neutral-800 leading-relaxed">
              Gw orangnya susah tidur cepet dan susah untuk bangun 💤
        <div className="mt-6 grid gap-4 text-sm font-normal sm:grid-cols-2">
          <InfoCard title="Hobi">
            <p className="mt-2 font-medium tracking-wide text-white/90">Bermain Sepak Bola</p>
          </InfoCard>
          <InfoCard title="Fun Fact">
            <p className="mt-2 leading-relaxed font-medium text-white/90">
              Gw orangnya susah tidur cepet dan susah untuk bangun
            </p>
          </InfoCard>
        </div>

        {/* SPOTIFY EMBED: Y2K Media Player Box */}
        <div className="relative mt-8 rounded-2xl border-[3px] border-neutral-900 bg-white p-5 shadow-[6px_6px_0px_#000080] transition-all hover:translate-x-1 hover:shadow-[4px_4px_0px_#000080]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500">Lagu Favorit</p>
              <p className="mt-1 font-['Clash_Display',_sans-serif] text-xl font-black text-neutral-900">Soulmate 🎧</p>
            </div>
            <div className="animate-spin-slow text-2xl">💿</div>
          </div>

          <div className="overflow-hidden rounded-xl border-2 border-neutral-100 bg-neutral-50">
        <InfoCard title="Lagu Favorit" className="mt-4">
          <p className="mt-1.5 mb-3 text-base font-semibold tracking-wide text-white">Soulmate</p>
          <div className="overflow-hidden rounded-lg bg-black/10 shadow-inner">
            <SpotifyEmbed spotifyUrl="https://open.spotify.com/track/1rwGbGLDE0AkaH1UgUbufL?si=02a2150c40ed49e3" />
          </div>
        </InfoCard>
      </div>
    </div>
  )
}

const InfoCard = ({ title, children, className = '' }: React.PropsWithChildren<{ title: string; className?: string }>) => (
  <div
    className={`rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-5 transition-all duration-300 hover:border-white/[0.15] ${className}`}
  >
    <p className="text-[11px] font-bold tracking-wider text-white/40 uppercase">{title}</p>
    {children}
  </div>
)

export default MemberPopup
