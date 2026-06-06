'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Instagram from '@/components/atoms/button/InstagramButtonLink'
import LinkedInButtonLink from '@/components/atoms/button/LinkedInButtonLink'
import SpotifyEmbed from '@/components/molecules/SpotifyEmbed'
import ProfileImage from './image.png'

type MemberPopupProps = {
  isOpen: boolean
  onClose: () => void
}

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 1.5 + 0.5,
  gold: Math.random() > 0.75,
  opacity: Math.random() * 0.6 + 0.2,
}))

const MemberPopup = ({ isOpen, onClose }: MemberPopupProps) => {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setRevealed(false)
      return
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const StarField = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {STARS.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.gold ? '#f4c07a' : '#ffffff',
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )

  if (!revealed) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 30%, #0d1b2a 0%, #060d14 100%)' }}
        />
        <StarField />
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #0a1520 0%, transparent 100%)' }}
        />
        <div className="relative z-10 flex flex-col items-center gap-5 px-8 text-center max-w-sm">
          <div className="text-4xl select-none">🔥</div>
          <p className="text-xs tracking-[0.5em] uppercase" style={{ color: '#f4c07a88' }}>
            ゆるキャン △
          </p>
          <h2
            className="text-xl font-bold tracking-widest"
            style={{ color: '#f4c07a', textShadow: '0 0 20px #f9731644', fontFamily: 'serif' }}
          >
            A Campfire Awaits
          </h2>
          <p className="text-white/40 text-xs leading-relaxed max-w-xs">
            "The night is cold and the stars are out. Come, sit by the fire before we get acquainted."
          </p>
          <button
            onClick={() => setRevealed(true)}
            className="mt-3 px-10 py-3 text-sm font-bold tracking-[0.3em] uppercase transition-all duration-300"
            style={{ color: '#f4c07a', border: '1px solid #f4c07a44', background: 'transparent' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#f4c07a11'
              e.currentTarget.style.borderColor = '#f4c07a99'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = '#f4c07a44'
            }}
          >
            [ Sit by the Fire ]
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 pt-28 pb-8 sm:pt-32">
      <button
        type="button"
        aria-label="Close member detail"
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 20%, #0d1b2a 0%, #060d14 100%)' }}
      />
      <StarField />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(6, 13, 20, 0.65)', backdropFilter: 'blur(2px)' }}
      />
      <div
        className="relative z-10 max-h-[calc(100vh-9rem)] w-full max-w-[720px] animate-[member-popup-show_200ms_ease-out] overflow-y-auto p-6 text-white sm:max-h-[calc(100vh-10rem)] sm:p-8"
        style={{
          background: 'linear-gradient(160deg, #0d1b2a 0%, #112030 60%, #0d1b2a 100%)',
          border: '1px solid #f4c07a22',
          boxShadow: '0 0 0 1px #f4c07a0a, inset 0 0 60px #f9731606, 0 20px 60px #00000099',
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, #f97316aa, transparent)',
            filter: 'blur(4px)',
          }}
        />
        <span className="absolute top-3 left-4 text-xs select-none" style={{ color: '#f4c07a33' }}>✦</span>
        <span className="absolute top-3 right-12 text-xs select-none" style={{ color: '#f4c07a33' }}>✦</span>

        <button
          type="button"
          aria-label="Close member detail"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center text-lg leading-none transition-colors"
          style={{ color: '#f4c07a55', border: '1px solid #f4c07a22' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#f4c07a')}
          onMouseLeave={e => (e.currentTarget.style.color = '#f4c07a55')}
        >
          ✕
        </button>

        <div
          className="mb-5 overflow-hidden"
          style={{ border: '1px solid #f4c07a1a', boxShadow: '0 4px 20px #00000066' }}
        >
          <Image
            src={ProfileImage}
            alt="Profile Image"
            className="h-120 w-full object-cover object-top"
            style={{ filter: 'brightness(0.95) saturate(0.9)' }}
          />
        </div>

        <p className="text-xs tracking-[0.4em] uppercase mb-1" style={{ color: '#f4c07a44' }}>
          — Camper Profile —
        </p>
        <div className="pr-10">
          <h2 className="text-2xl font-black tracking-wide" style={{ textShadow: '0 0 15px #f9731622' }}>
            Muhamad Nasrulhaq
          </h2>
          <p className="mt-1 text-sm font-semibold" style={{ color: '#f4c07a66' }}>
            5027251117 · Mataram
          </p>
        </div>

        <div
          className="my-4 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #f4c07a33, transparent)' }}
        />

        <div className="flex gap-2 mb-5">
          <Instagram username="arul_haq06" />
          <LinkedInButtonLink username="muhamad-nasrulhaq-354609379" />
        </div>

        <div className="grid gap-4 text-sm font-semibold sm:grid-cols-2 mb-4">
          <div
            className="p-4"
            style={{
              background: '#0a1520',
              border: '1px solid #f4c07a15',
              boxShadow: 'inset 0 0 15px #00000044',
            }}
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#f4c07a55' }}>
              ⛺ Hobbies
            </p>
            <p className="text-white/75">Reading novels, playing games, and badminton</p>
          </div>
          <div
            className="p-4"
            style={{
              background: '#0a1520',
              border: '1px solid #f4c07a15',
              boxShadow: 'inset 0 0 15px #00000044',
            }}
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#f4c07a55' }}>
              🌙 Fun Fact
            </p>
            <p className="text-white/75">I was born on American Independence Day</p>
          </div>
        </div>

        <div
          className="p-4"
          style={{
            background: '#0a1520',
            border: '1px solid #f4c07a15',
            boxShadow: 'inset 0 0 15px #00000044',
          }}
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#f4c07a55' }}>
            🎵 Favorite Song
          </p>
          <p className="text-white/75 text-sm font-semibold mb-3">Fuyubiyori</p>
          <SpotifyEmbed spotifyUrl="https://open.spotify.com/track/4Ts3FQkEs1jRIbcgxxT7R0?si=ef181a5eb58d47ac" />
        </div>

        <div
          className="mt-5 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #f4c07a22, transparent)' }}
        />
        <p className="text-center text-xs mt-3 tracking-widest" style={{ color: '#f4c07a22' }}>
          ✦ ゆるキャン △ ✦
        </p>
      </div>
    </div>
  )
}

export default MemberPopup