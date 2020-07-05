import { useEffect } from 'react'

export type Handler = (e: Event) => void

const useOnClickOutside = (ref: React.RefObject<any>, handler?: Handler): void => {
  useEffect(() => {
    const listener = (e: Event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(e.target)) {
        return
      }

      handler?.(e)
    }

    document.addEventListener('click', listener)
    // document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('click', listener)
      // document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export default useOnClickOutside
