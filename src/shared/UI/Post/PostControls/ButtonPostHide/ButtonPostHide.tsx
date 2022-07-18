import React from 'react'
import { ButtonHideIcon } from '../../../components/Icons/ButtonHideIcon'
import styles from './buttonposthide.less'

export function ButtonPostHide() {
  return (
    <button className={styles.button}>
      <ButtonHideIcon />
      <span className={styles.text}>скрыть</span>
    </button>
  )
}
