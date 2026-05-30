import { useSyncExternalStore } from 'react'

type WindowDimensions = {
  width: number
  height: number
}

const SERVER_WINDOW_DIMENSIONS: WindowDimensions = { width: 0, height: 0 }

let windowDimensionsSnapshot: WindowDimensions = SERVER_WINDOW_DIMENSIONS

const subscribeToWindowResize = (onStoreChange: () => void) => {
  if (typeof window === 'undefined') return () => {}

  window.addEventListener('resize', onStoreChange)
  return () => window.removeEventListener('resize', onStoreChange)
}

const getWindowDimensionsSnapshot = () => {
  if (typeof window === 'undefined') return SERVER_WINDOW_DIMENSIONS

  const nextSnapshot = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  if (
    nextSnapshot.width === windowDimensionsSnapshot.width &&
    nextSnapshot.height === windowDimensionsSnapshot.height
  ) {
    return windowDimensionsSnapshot
  }

  windowDimensionsSnapshot = nextSnapshot
  return windowDimensionsSnapshot
}

export default function useWindowDimensions() {
  return useSyncExternalStore(
    subscribeToWindowResize,
    getWindowDimensionsSnapshot,
    () => SERVER_WINDOW_DIMENSIONS
  )
}
