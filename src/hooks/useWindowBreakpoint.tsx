import breakpoints from '@/statics/breakpoint'

import useWindowDimensions from './useWindowDimentions'

const getBreakpoint = (width: number) => {
  if (width <= 0) return ''
  if (width < breakpoints.sm) return 'xs'
  if (width < breakpoints.md) return 'sm'
  if (width < breakpoints.lg) return 'md'
  if (width < breakpoints.xl) return 'lg'
  if (width < breakpoints['2xl']) return 'xl'
  return '2xl'
}

export default function useWindowBreakpoint() {
  const { width } = useWindowDimensions()

  return getBreakpoint(width)
}
