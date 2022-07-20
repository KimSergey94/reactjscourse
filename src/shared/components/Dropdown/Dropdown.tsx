import React from 'react'
import { EIconName, Icon } from '../Icons/Icon'
import styles from './dropdown.less'

interface IDropdownProps {
  children: React.ReactNode
  cardId: string
  isOpen: boolean
}

export function Dropdown({ children, cardId, isOpen }: IDropdownProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen)

  const handleOpen = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  React.useEffect(() => {
    function handleClickedOut(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target))
        setIsDropdownOpen(false)
    }
    document.addEventListener('click', handleClickedOut)
    return () => {
      document.removeEventListener('click', handleClickedOut)
    }
  }, [])

  const node = document.getElementById(`card${cardId}`)
  if (!node) return null
  return (
    <div className={styles.container} ref={ref}>
      <div onClick={handleOpen}>
        <button className={styles.menuButton}>
          <Icon size={20} name={EIconName.MenuIcon} />
        </button>
      </div>
      {isDropdownOpen && children}
    </div>
  )
}
