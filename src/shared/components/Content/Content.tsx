import React from 'react'
import styles from './content.less'

interface IContentProps {
  children?: React.ReactNode
  isPostContent?: boolean
}
export function Content({ children, isPostContent = false }: IContentProps) {
  return (
    <main className={isPostContent ? styles.postContent : styles.content}>
      {children}
    </main>
  )
}
