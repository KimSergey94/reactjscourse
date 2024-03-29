import React, { ChangeEvent, FormEvent } from 'react'
import { IconFormCommentSubmit } from '../../../../components/Icons/IconFormCommentSubmit'
import { ButtonCommentAdd } from './ButtonCommentAdd'
import { ButtonCommentSmile } from './ButtonCommentSmile'
import styles from './formcomments.less'

interface IFormComments {
  handleSubmit: (comment: string, e: FormEvent) => void
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  valueInput: string
  name?: string
  myRef: React.RefObject<HTMLDivElement>
  refInput: React.RefObject<HTMLTextAreaElement>
  textAreaRows: number
}
export function FormComments({
  handleSubmit,
  valueInput,
  myRef,
  refInput,
  textAreaRows,
  name,
  handleChange,
}: IFormComments) {
  return (
    <div ref={myRef} className={styles.containerForm}>
      <form
        onSubmit={(e) => handleSubmit(valueInput, e)}
        className={styles.form}
        action=""
      >
        <div className={styles.buttonCommentAddContainer}>
          <ButtonCommentAdd />
        </div>

        <textarea
          ref={refInput}
          id="commentText"
          rows={textAreaRows}
          onChange={handleChange}
          value={valueInput}
          placeholder={
            textAreaRows === 1 && name
              ? `${name} оставьте ваш комментарий`
              : 'Ваш комментарий'
          }
          className={styles.input}
        />
        <ButtonCommentSmile />
        <button className={styles.buttonSubmit} type="submit">
          <IconFormCommentSubmit />
        </button>
      </form>
    </div>
  )
}
