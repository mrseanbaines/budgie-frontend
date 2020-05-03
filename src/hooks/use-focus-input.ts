import { useRef, useEffect } from 'react'

const useFocusInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [inputRef])

  return inputRef
}

export default useFocusInput
