import React from 'react'
import { IconAdd } from '../../../../../components/Icons/IconAdd'
import styles from './buttoncommentadd.less'

export function ButtonCommentAdd() {
  return (
    <button className={styles.button} type="button">
      <IconAdd />
    </button>
  )
}
