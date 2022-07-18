import React from 'react'
import { ButtonFryIcon } from '../../../../../Icons/ButtonFryIcon'
import styles from './buttoncommentcomplain.less'

export function ButtonCommentComplain() {
  return (
    <button className={styles.button}>
      <ButtonFryIcon />
      <span className={styles.text}>Пожаловаться</span>
    </button>
  )
}
