import React from 'react'
import { IconWarning } from '../../../components/Icons/IconWarning'
import styles from './buttonpostcomplain.less'

export function ButtonPostComplain() {
  return (
    <button className={styles.button}>
      <IconWarning />
      <span className={styles.text}>пожаловаться</span>
    </button>
  )
}
