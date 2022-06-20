import { useFormik } from 'formik';
import React, { ChangeEvent } from 'react';
import { IconFormCommentSubmit } from '../../../Icons/IconFormCommentSubmit';
import { ButtonCommentAdd } from './ButtonCommentAdd';
import { ButtonCommentSmile } from './ButtonCommentSmile';
import styles from './formcomments.less';

interface IFormComments {
  handleSubmit: (comment:string) => void;
  // handleChange: (e:ChangeEvent<HTMLTextAreaElement>) => void ;
  valueInput: string;
  name?: string;
  myRef: React.RefObject<HTMLDivElement>;
  refInput: React.RefObject<HTMLTextAreaElement>;
  textAreaRows: number;
}
export function FormComments({handleSubmit, valueInput, myRef, refInput, textAreaRows, name }: IFormComments) {
  const formik = useFormik({
    initialValues: {
      commentText: valueInput,
    },
    onSubmit: (values) => {
      handleSubmit(values.commentText);
    },
  });
  console.log('FormComments',myRef, refInput);
  
  return (
    <div ref={myRef} className={styles.containerForm}>
      <form onSubmit={formik.handleSubmit} className={styles.form} action="">
        <div className={styles.buttonCommentAddContainer}>
          <ButtonCommentAdd />
        </div>

        <textarea ref={refInput} id="commentText"
          rows={textAreaRows} onChange={formik.handleChange}
          value={formik.values.commentText} placeholder={textAreaRows ===1 && name ? `${name} оставьте ваш комментарий` :'Ваш комментарий'} className={styles.input}  />
        <ButtonCommentSmile />
        <button className={styles.buttonSubmit} type="submit"><IconFormCommentSubmit /></button>
      </form>
    </div>
  );
}
