import React from 'react'
import { Text } from '../../../../Text'
import { ButtonCommentComplain } from './ButtonCommentComplain'
import { ButtonCommentShared } from './ButtonCommentShared'
import { CommentAction } from './CommentAction'
import styles from './commentbar.less'
import { CommentButtonAnswer } from './CommentButtonAnswer'
import { CommentKarmaCounter } from './CommentKarmaCounter'

interface ICommentBar {
  statistic?: string
  handleClickComment: () => void
  score: number
}
export function CommentBar({
  statistic = '0',
  handleClickComment,
  score,
}: ICommentBar) {
  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <CommentKarmaCounter score={score} />
        <CommentButtonAnswer handleClick={handleClickComment} />
        <CommentAction />
        <ButtonCommentShared />
        <ButtonCommentComplain />
      </div>
      <div className={styles.statistic}>
        <Text size={14}>{statistic}% Проголосовали</Text>
      </div>
    </div>
  )
}
