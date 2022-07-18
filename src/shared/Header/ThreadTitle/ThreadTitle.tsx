import React from 'react'
import img from '../../../assets/images/logo.png'
import styles from './threadtitle.less'

export function ThreadTitle() {
  return (
    <div className={styles.threadTitle}>
      <img src={img} className={styles.threadLogo} />
    </div>
  )
}
