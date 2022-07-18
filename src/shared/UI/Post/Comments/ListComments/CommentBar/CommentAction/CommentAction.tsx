import React from 'react'
import { IconShare } from '../../../../../components/Icons/IconShare'
import { IconWarning } from '../../../../../components/Icons/IconWarning'
import styles from './commentaction.less'

export function CommentAction() {
  return (
    <div className={styles.actions}>
      <button className={styles.shareButton}>
        <IconShare />
      </button>
      <button className={styles.saveButton}>
        <IconWarning />
      </button>
    </div>
  )
}
