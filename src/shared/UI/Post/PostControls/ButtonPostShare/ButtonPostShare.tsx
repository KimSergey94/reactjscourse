import React from 'react'
import { ButtonShareIcon } from '../../../components/Icons/ButtonShareIcon'
import { IconShare } from '../../../components/Icons/IconShare'
import styles from './buttonpostshare.less'

export function ButtonPostShare() {
  return (
    <button className={styles.button}>
      <span className={styles.mobile}>
        <IconShare />
      </span>
      <span className={styles.desktop}>
        <ButtonShareIcon />
      </span>
      <span className={styles.text}>поделиться</span>
    </button>
  )
}
