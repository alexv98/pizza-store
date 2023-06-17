import {RefObject, useEffect} from "react";

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: (event: boolean) => void
  ) => {

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if(ref.current && !event.composedPath().includes(ref.current)) {
        callback(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])
}

export default useClickOutside

