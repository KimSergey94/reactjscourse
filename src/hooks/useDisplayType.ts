import { useEffect, useState } from 'react'

export function useDisplayType() {
  const [displayType, setDisplayType] = useState('')
  useEffect(() => {
    if (window.innerWidth > 1023) {
      setDisplayType('desktop')
    } else setDisplayType('mobile')
  }, [])

  return [displayType]
}
