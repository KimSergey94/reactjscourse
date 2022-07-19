import React from 'react'
import { ButtonCommentsIcon } from '../../../components/Icons/ButtonCommentsIcon'
import styles from './buttoncomment.less'

interface IButtonCommentProps {
  totalComments: number
}
export function ButtonComment({ totalComments }: IButtonCommentProps) {
  return (
    <button className={styles.button}>
      <ButtonCommentsIcon />
      <span>
        {totalComments}
        <span className={styles.spanHide}>коментариев</span>
      </span>
    </button>
  )
}
