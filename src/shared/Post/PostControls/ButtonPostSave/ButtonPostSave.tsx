import React from 'react'
import { ButtonSaveIcon } from '../../../Icons/ButtonSaveIcon'
import { IconSave } from '../../../Icons/IconSave'
import styles from './buttonpostsave.less'

export function ButtonPostSave() {
  return (
    <button className={styles.button}>
      <span className={styles.desktop}>
        <ButtonSaveIcon />
      </span>
      <span className={styles.mobile}>
        <IconSave />
      </span>
      <span className={styles.text}>сохранить</span>
    </button>
  )
}
