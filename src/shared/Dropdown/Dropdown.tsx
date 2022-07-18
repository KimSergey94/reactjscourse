/**
 * @jest-environment jsdom
 */

import React from 'react'
import styles from './dropdown.less'
import { DropdownContent } from './DropdownContent'

interface IDropdownProps {
  button: React.ReactNode
  children: React.ReactNode
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  cardId: string
}

const NOOP = () => {}

export function Dropdown({
  button,
  children,
  isOpen,
  onOpen = NOOP,
  onClose = NOOP,
  cardId,
}: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen)
  React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen])
  React.useEffect(
    () => (isDropdownOpen ? onOpen() : onClose()),
    [isDropdownOpen]
  )

  const handleOpen = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className={styles.container}>
      <div onClick={handleOpen}>{button}</div>
      {isDropdownOpen && (
        <DropdownContent
          cardId={cardId}
          onClose={() => {
            setIsDropdownOpen(!isDropdownOpen)
          }}
          handleClick={() => {
            setIsDropdownOpen(!isDropdownOpen)
          }}
        >
          {children}
        </DropdownContent>
      )}
    </div>
  )
}
