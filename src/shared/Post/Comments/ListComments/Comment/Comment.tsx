import { createEvent, createStore } from 'effector'
import { useStore } from 'effector-react'
import moment from 'moment'
import React, { ChangeEvent, useContext, useState } from 'react'
import { IconAnon } from '../../../../components/Icons/IconAnon'
import { userContext } from '../../../../lib/react/context/userContext'
import { ICommentsList } from '../../Comments'
import { FormCommentsContainer } from '../../FormCommentsContainer'
import { CommentBar } from '../CommentBar'
import styles from './comment.less'

const updateComment = createEvent<string>()
const $comment = createStore('').on(updateComment, (_, newValue) => newValue)

interface ICommentProps {
  comment: ICommentsList
}
export function Comment(props: ICommentProps) {
  const value = useStore($comment)

  function handleClickedOut() {
    setVisibleForm(false)
  }
  function handleClickComment() {
    setVisibleForm(!isVisibleForm)
    updateComment(`${props.comment.author}, `)
  }
  const [subComments] = useState(props.comment.children)
  const [isVisibleForm, setVisibleForm] = useState(false)
  const { data } = useContext(userContext)

  function submitForm(comment: string) {
    if (!data?.name) {
      console.log('Нужно авторизоваться')
      return
    }
    alert(comment)
    updateComment('')
    setVisibleForm(false)
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    updateComment(`${e.target.value}`)
  }

  return (
    <li className={`${styles.comment}`}>
      <div className={styles.header}>
        <span className={styles.category}>{props.comment.category}</span>
        <div className={styles.metaData}>
          <div className={styles.userLink}>
            {props.comment.avatarSrc ? (
              <img
                src={props.comment.avatarSrc}
                alt="user avatar"
                className={styles.avatar}
              />
            ) : (
              <IconAnon />
            )}
            <a href="#user-url" className={styles.username}>
              {props.comment.author}
            </a>
          </div>
          <span className={styles.createdAt}>
            <span className={styles.publishedLabel}>опубликовано</span>
            {props.comment.created_utc
              ? moment.unix(parseInt(props.comment.created_utc)).fromNow()
              : ''}
          </span>
        </div>
      </div>
      <div className={styles.text}>{props.comment.text}</div>
      <CommentBar
        handleClickComment={handleClickComment}
        score={props.comment.score}
      />
      {isVisibleForm && (
        <FormCommentsContainer
          handleClicked={handleClickedOut}
          valueInput={value}
          handleSubmit={submitForm}
          name={data?.name}
          handleChange={handleChange}
        />
      )}
      <ul className={styles.list}>
        {subComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </li>
  )
}
