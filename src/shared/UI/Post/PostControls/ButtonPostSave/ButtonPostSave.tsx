import React from 'react'
import { ButtonSaveIcon } from '../../../components/Icons/ButtonSaveIcon'
import { IconSave } from '../../../components/Icons/IconSave'
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
