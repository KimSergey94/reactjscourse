import React from 'react'
import { ButtonShareIcon } from '../../../../../Icons/ButtonShareIcon'
import styles from './buttoncommentshared.less'

export function ButtonCommentShared() {
  return (
    <button className={styles.button}>
      <ButtonShareIcon />
      <span className={styles.text}>Поделиться</span>
    </button>
  )
}
