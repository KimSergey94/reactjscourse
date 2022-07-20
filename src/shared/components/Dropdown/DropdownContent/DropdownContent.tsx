import React from 'react'
import styles from './dropdowncontent.less'

interface IDropdownContentProps {
  children: React.ReactNode | string
}
export function DropdownContent({ children }: IDropdownContentProps) {
  return <div className={styles.list}>{children}</div>
}
