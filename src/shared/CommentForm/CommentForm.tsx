import React, { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
import styles from './commentform.less';
import { commentContext } from '../../shared/context/commentContext';

export function CommentForm(){
    const {value, onChange} = useContext(commentContext);
    function handleChange(event: ChangeEvent<HTMLTextAreaElement>){
        onChange(event.target.value);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        console.log(value);
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <textarea className={styles.input} value={value} onChange={handleChange}/>
            <button type='submit' className={styles.button}>Комментировать</button>
        </form>
    );
}