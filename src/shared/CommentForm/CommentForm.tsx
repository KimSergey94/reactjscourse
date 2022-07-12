import React, { ChangeEvent, FormEvent } from 'react';
import styles from './commentform.less';
import {Comment} from '../CommentFormContainer'

type Props = {
    // value: string;
    value: Comment;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>)=>void;
    onSubmit: (event: FormEvent)=>void;
}

export function CommentForm({value,onChange,onSubmit}:Props){
    return(
        <form className={styles.form} onSubmit={onSubmit}>
            <textarea className={styles.input} value={value.value} onChange={onChange}/>
            <button type='submit' className={styles.button}>Комментировать</button>
        </form>
    );
}