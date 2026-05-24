'use client'

import { useMemo, useState } from 'react'

import People from '@/components/atoms/icon/People'

import type { ProvincePathData } from '@/types/maps'

type MapInteractiveProps = {
  provinces: ProvincePathData[]
  svgWidth: number
  svgHeight: number
}

const MapInteractive = ({ provinces, svgWidth, svgHeight }: MapInteractiveProps) => {
  const [hoveredProvinceId, setHoveredProvinceId] = useState<string | null>(null)
  const provinceById = useMemo(
    () =>
      provinces.reduce<Record<string, ProvincePathData>>((acc, province) => {
        acc[province.id] = province
        return acc
      }, {}),
    [provinces]
  )
  const hoveredProvince = hoveredProvinceId ? (provinceById[hoveredProvinceId] ?? null) : null

  return (
    <div className="relative mt-8 w-full max-w-[1440px] px-3 py-16 md:px-6">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="h-auto w-full"
        role="img"
        aria-label="Peta Indonesia per provinsi"
        onMouseLeave={() => setHoveredProvinceId(null)}
      >
        <g fillRule="evenodd" clipRule="evenodd">
          {provinces.map((province) => (
            <path
              key={province.id}
              d={province.path}
              className={`${province.fillClassName} stroke-neutral-cs-10 hover:fill-blue-cs-10 transition-colors duration-200`}
              strokeWidth={1}
              tabIndex={0}
              aria-label={`${province.province}, total mahasiswa ${province.totalMahasiswa}`}
              onMouseEnter={() => setHoveredProvinceId(province.id)}
              onFocus={() => setHoveredProvinceId(province.id)}
              onBlur={() => setHoveredProvinceId(null)}
            >
              <title>{province.province}</title>
            </path>
          ))}
        </g>
      </svg>
      {hoveredProvince ? (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 translate-y-[-130%]"
          style={{
            left: `${(hoveredProvince.centerX / svgWidth) * 100}%`,
            top: `${(hoveredProvince.centerY / svgHeight) * 100}%`
          }}
        >
          <div className="bg-neutral-cs-10 relative w-48 rounded-2xl px-6 py-3 text-center shadow-lg">
            <p className="font-semibold">{hoveredProvince.province}</p>
            <div className="mt-1 flex items-center justify-center gap-2">
              <p className="text-yellow-cs-40 font-rubikone text-2xl leading-none">{hoveredProvince.totalMahasiswa}</p>
              <People />
            </div>
            <span className="sr-only">Total mahasiswa {hoveredProvince.totalMahasiswa}</span>
            <div className="absolute bottom-[-12px] left-1/2 h-0 w-0 -translate-x-1/2 border-t-[14px] border-r-[12px] border-l-[12px] border-t-white border-r-transparent border-l-transparent" />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MapInteractive
