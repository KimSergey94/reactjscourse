import React from 'react'
import styles from './postcontrols.less'

interface IPostControls {
  children: React.ReactNode
}

export function PostControls({ children }: IPostControls) {
  return <div className={styles.container}>{children}</div>
}
