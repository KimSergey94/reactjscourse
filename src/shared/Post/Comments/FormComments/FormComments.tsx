import React, { ChangeEvent, FormEvent, RefObject, useEffect, useRef, useState } from 'react';
import { IconFormCommentSubmit } from '../../../Icons/IconFormCommentSubmit';
import { ButtonCommentAdd } from './ButtonCommentAdd';
import { ButtonCommentSmile } from './ButtonCommentSmile';
import styles from './formcomments.less';

interface IFormComments {
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e:ChangeEvent<HTMLTextAreaElement>) => void ;
  valueInput: string;

  ref: React.RefObject<HTMLDivElement>;
  refInput: React.RefObject<HTMLTextAreaElement>;
  textAreaRows: number;
}
function f () {}
export function FormComments({handleSubmit, handleChange, valueInput, ref, refInput, textAreaRows }: IFormComments) {
  return (
    <div ref={ref} className={styles.containerForm}>
      <form onSubmit={handleSubmit} className={styles.form} action="">
      <div className={styles.buttonCommentAddContainer}>
        <ButtonCommentAdd />
        </div>
        <textarea ref={refInput}
         rows={textAreaRows} onChange={handleChange} value={valueInput} placeholder={textAreaRows ===3 && name ? `${name} оставьте ваш комментарий` :'Ваш комментарий'} className={styles.input}  />
        <ButtonCommentSmile />
        <button  className={styles.buttonSubmit}>
         <IconFormCommentSubmit />
        </button>
    </form>
    </div>
  );
}
