import React, { ChangeEvent, FormEvent, RefObject, useEffect, useRef, useState } from 'react';
import { IconFormCommentSubmit } from '../../../Icons/IconFormCommentSubmit';
import { ButtonCommentAdd } from './ButtonCommentAdd';
import { ButtonCommentSmile } from './ButtonCommentSmile';
import styles from './formcomments.less';
interface IFormComments {
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e:ChangeEvent<HTMLTextAreaElement>) => void ;
  valueInput: string;
  name?: string;
  handleClicked?: () => void;
}
function f () {}
export function FormComments({handleSubmit, handleChange, valueInput, name, handleClicked = f }: IFormComments) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=> {
    function handleClickedOut (event: MouseEvent){
      if(event.target instanceof Node && !ref.current?.contains(event.target))
      handleClicked?.()
    }
    document.addEventListener('click', handleClickedOut);
    return () => {
      document.removeEventListener('click', handleClickedOut)
    }
  }, [])
const [textAreaRows, setTextAreaRows] = useState(1);
const refInput = useRef<HTMLTextAreaElement>(null);
function focusOnInput (){
  refInput.current?.focus();
}
useEffect (()=> {
  focusOnInput ();
},[])
 function handleResize () {
    if(window.innerWidth >= 1024){
      setTextAreaRows(3)
      }
    else {
      setTextAreaRows(1)
      }
}

  useEffect(()=>{
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[])

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
