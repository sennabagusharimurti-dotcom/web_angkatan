'use client'

import React, { useEffect, useState, useRef } from 'react'

import Image from 'next/image'

import Instagram from '@/components/atoms/button/InstagramButtonLink'
import LinkedInButtonLink from '@/components/atoms/button/LinkedInButtonLink'
import SpotifyEmbed from '@/components/molecules/SpotifyEmbed'

import ProfileImage from './image.jpeg'

type MemberPopupProps = {
  isOpen: boolean
  onClose: () => void
}

const MemberPopup = ({ isOpen, onClose }: MemberPopupProps) => {
  const [battleWon, setBattleWon] = useState(false)
  const [attacking, setAttacking] = useState(false)
  const [markerPos, setMarkerPos] = useState(0)
  const [message, setMessage] = useState('Press FIGHT to attack!')
  const battleStartRef = useRef<HTMLAudioElement | null>(null)
  const battleThemeRef = useRef<HTMLAudioElement | null>(null)
  const winJingleRef = useRef<HTMLAudioElement | null>(null)
  const [musicStarted, setMusicStarted] = useState(false)

useEffect(() => {
  battleStartRef.current = new Audio('/assets/sounds/battle-start.mp3')

  battleThemeRef.current = new Audio('/assets/sounds/rude-buster.mp3')
  battleThemeRef.current.loop = true
  battleThemeRef.current.volume = 0.4

  winJingleRef.current = new Audio('/assets/sounds/win-jingle.mp3')
  winJingleRef.current.volume = 0.7

  return () => {
    battleStartRef.current?.pause()
    battleThemeRef.current?.pause()
    winJingleRef.current?.pause()
  }
}, [])
const battleFinishedRef = useRef(false)

const startBattleMusic = async () => {
  if (musicStarted) return

  setMusicStarted(true)

  try {
    if (!battleStartRef.current || !battleThemeRef.current) return

    battleFinishedRef.current = false

    battleStartRef.current.currentTime = 0

    battleStartRef.current.onended = () => {
      if (!battleFinishedRef.current) {
        battleThemeRef.current?.play()
      }
    }

    await battleStartRef.current.play()
  } catch (err) {
    console.error(err)
  }
}

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!attacking) return

    let direction = 1

    const interval = setInterval(() => {
      setMarkerPos(prev => {
        let next = prev + direction * 4

        if (next >= 100) {
          direction = -1
          next = 100
        }

        if (next <= 0) {
          direction = 1
          next = 0
        }

        return next
      })
    }, 16)

    return () => clearInterval(interval)
  }, [attacking])

  const handleAttack = () => {
    if (!attacking) {
      if (!musicStarted) {
        startBattleMusic()
        setMusicStarted(true)
      }

      setMessage('Stop inside the yellow zone!')
      setAttacking(true)
      return
    }

    const distance = Math.abs(markerPos - 50)

    setAttacking(false)

    if (distance <= 8) {
      battleFinishedRef.current = true

      battleStartRef.current?.pause()

      if (battleStartRef.current) {
        battleStartRef.current.currentTime = 0
        battleStartRef.current.onended = null
      }

      battleThemeRef.current?.pause()

      if (battleThemeRef.current) {
        battleThemeRef.current.currentTime = 0
      }

      winJingleRef.current?.play()

      setTimeout(() => {
        setBattleWon(true)
      }, 1000)
    } else if (distance <= 18) {
      setMessage('Wadooh, dikit lagi banh')
    } else {
      setMessage('CUPU AH')
    }
  }
  const closePopup = () => {
    battleStartRef.current?.pause()
    battleThemeRef.current?.pause()
    winJingleRef.current?.pause()

    if (battleStartRef.current) {
      battleStartRef.current.currentTime = 0
    }

    if (battleThemeRef.current) {
      battleThemeRef.current.currentTime = 0
    }

    if (winJingleRef.current) {
      winJingleRef.current.currentTime = 0
    }

    setBattleWon(false)
    setAttacking(false)
    setMarkerPos(0)
    setMusicStarted(false)
    setMessage('Press FIGHT to attack!')

    onClose()
  }

  if (!isOpen) {
    return null
  }

  if (!battleWon) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center">

      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* battle box */}
      <div className="relative z-10 w-[600px] border-4 border-white bg-black p-8 text-white">
          <h1 className="mb-6 text-center text-3xl font-bold">
            ⚠ ENCOUNTER ⚠
          </h1>

          <p className="mb-2 text-center text-xl">
            LEWATI TAHAP INI SEBELUM MELIHAT IDENTITAS RAJA IBLIS
          </p>

          <div className="mb-4 border-2 border-white p-4">
            {message}
          </div>

          <div className="relative mb-8 h-8 border-2 border-white">

            <div
              className="absolute top-0 left-1/2 h-full w-16 -translate-x-1/2 bg-yellow-400"
            />

            <div
              className="absolute top-0 h-full w-2 bg-red-500"
              style={{
                left: `${markerPos}%`,
              }}
            />

          </div>

          <button
            onClick={handleAttack}
            className="
              w-full
              border-2
              border-white
              p-4
              text-lg
              font-bold
              hover:bg-white
              hover:text-black
            "
          >
            {attacking ? 'STOP!' : 'FIGHT'}
          </button>

        </div>
      </div>
    )
  }

  // lanjut ke popup asli milikmu di bawah sini
  return (
  <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 pt-28 pb-8 sm:pt-32">
    {/* backdrop */}
    <button
      type="button"
      aria-label="Close member detail"
      onClick={closePopup}
      className="absolute inset-0 bg-black/70 backdrop-blur-sm"
    />

    {/* popup */}
    <div className="relative z-10 w-full max-w-[720px] overflow-hidden rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.35)]">
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/assets/videos/0605(2).mp4"
          type="video/mp4"
        />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50"/>

      {/* CONTENT */}
      <div className="relative z-10 max-h-[calc(100vh-9rem)] overflow-y-auto p-6 text-white sm:p-8">
        <button
          type="button"
          aria-label="Close member detail"
          onClick={closePopup}
          className="
            absolute
            top-4
            right-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/50
            bg-black/30
            text-xl
            backdrop-blur-sm
            hover:bg-white/20
          "
        >
          ×
        </button>

        {/* FOTO */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-white/20">
          <Image
            src={ProfileImage}
            alt="Profile Image"
            className="h-[500px] w-full object-cover object-center"
          />
        </div>

        {/* NAMA */}
        <div className="pr-10">
          <h2 className="text-4xl font-black drop-shadow-lg">
            Ni Putu Maqueenta Wijaya
          </h2>

          <p className="mt-2 text-lg font-semibold text-white/80">
            5027251004 - Mataram
          </p>
        </div>

        {/* SOCIAL */}
        <div className="mt-5 flex gap-3">
          <Instagram username="qinn.rl" />
          <LinkedInButtonLink username="queenta-wijaya-830649379" />
        </div>

        {/* HOBI & FUN FACT */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/20 bg-black/20 p-5 backdrop-blur-md">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/60">
              Hobi
            </p>

            <p className="font-semibold">
              1. Gambar (jangan lupa kepoin art account ku: @naowo__ on X and TikTok)
              <br />
              2. Main game (kalau gabut roblox, suka indie games juga)
              <br />
              3. Dengerin lagu
            </p>
          </div>

          <div className="rounded-xl border border-white/20 bg-black/20 p-5 backdrop-blur-md">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/60">
              Fun Fact
            </p>

            <p className="font-semibold">
              1. Aku kecil di Jepang
              <br />
              2. Aku suka dengerin lagu apapun yang enak di telinga ku
              <br />
              3. Aku multifandom
              <br />
              4. Suka crossdress
              <br />
              5. Iya, aku yang gambar bgnya. Jangan lupa diputar lagunya juga
            </p>
          </div>
        </div>

        {/* SPOTIFY */}
        <div className="mt-4 rounded-xl border border-white/20 bg-black/20 p-5 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-wider text-white/60">
            Lagu Favorit
          </p>

          <p className="my-2 font-semibold">
            私は雨
          </p>

          <SpotifyEmbed spotifyUrl="https://open.spotify.com/track/3s5sFHV8VTzg0CSXy3gz5y?si=4ef91bbc2083493f" />
        </div>
      </div>
    </div>
  </div>
)
}

export default MemberPopup
