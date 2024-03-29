import { createEvent, createStore } from 'effector'
import { useStore } from 'effector-react'
import React, { ChangeEvent, FormEvent } from 'react'
import { useUserData } from '../../lib/react/hooks/useUserData'
import styles from './comments.less'
import { FormCommentsContainer } from './FormCommentsContainer'
import { ListComments } from './ListComments'
import { SortComments } from './SortComments'

export interface ICommentsList {
  author: string
  text: string
  category: string
  avatarSrc: string
  children: ICommentsList[]
  id: string
  created_utc: string
  score: number
}
export interface ICommentsProps {
  commentsList: ICommentsList[]
}

const updateComment = createEvent<string>()
const $comment = createStore('').on(updateComment, (_, newValue) => newValue)

export function Comments({ commentsList }: ICommentsProps) {
  const value = useStore($comment)

  function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    updateComment(event.target.value)
  }
  const { data } = useUserData()

  function handleSubmitForm(comment: string, e: FormEvent) {
    e.preventDefault()
    if (!data?.name) {
      console.log('Что бы оставить комментарий авторизуйтесь')
      return
    }
    alert(comment)
    updateComment('')
  }

  return (
    <div className={styles.container}>
      <SortComments />
      <FormCommentsContainer
        name={data?.name}
        handleSubmit={handleSubmitForm}
        valueInput={value}
        handleChange={onChange}
      />
      <ListComments commentsList={commentsList} />
    </div>
  )
}
