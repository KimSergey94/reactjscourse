import { createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';
import moment from 'moment';
import React, { ChangeEvent, useContext, useState } from 'react';
import { userContext } from '../../../../context/userContext';
import { IconAnon } from '../../../../Icons/IconAnon';
import { ICommentsList } from '../../Comments';
import { FormCommentsContainer } from '../../FormCommentsContainer';
import { CommentBar } from '../CommentBar';
import styles from './comment.less';

const updateComment = createEvent<string>();
const $comment = createStore('')
  .on(updateComment, (_, newValue) => newValue);

  $comment.watch((state)=>{
    console.log(`state: ${state}`);
  });
  
export function Comment({author, text, category, avatarSrc, children, id, created_utc}: ICommentsList) {
  const value = useStore($comment);

  function handleClickedOut () {
    setVisibleForm(false);
  }
  function handleClickComment () {
   setVisibleForm(!isVisibleForm);
   updateComment(`${author}, `);
  }
  const [subComments, setSubCommentList] = useState(children);
  const [isVisibleForm , setVisibleForm] = useState(false);
  const {data, loading } = useContext(userContext);
  
  function submitForm(comment:string) {
    if(!data?.name) {
      console.log('Нужно авторизоваться')
      return
    }
    alert(comment);
  updateComment('');
  setVisibleForm(false);
  }
  
  function handleChange (e: ChangeEvent<HTMLTextAreaElement>) {
    updateComment(`${e.target.value}`);
  }

  return (
   <li className={`${styles.comment}`}>
     <div className={styles.header}>
    <span className={styles.category}>{category}</span>
   <div className={styles.metaData}>
     <div className={styles.userLink}>
     {avatarSrc
          ? <img  src={avatarSrc} alt="user avatar" className={styles.avatar} />
          : <IconAnon />
     }
       <a href="#user-url" className={styles.username}>{author}</a>
     </div>
     <span className={styles.createdAt}>
       <span className={styles.publishedLabel}>опубликовано</span>
       {created_utc ? moment.unix(parseInt(created_utc)).fromNow() : ''}</span>
  </div>
  </div>
    <div className={styles.text}>{text}</div>
    <CommentBar handleClickComment={handleClickComment}/>
    {isVisibleForm && (
      <FormCommentsContainer handleClicked={handleClickedOut} valueInput={value} handleSubmit={submitForm} name={data?.name} handleChange={handleChange} />
    )}
    <ul className={styles.list}>
    {subComments.map(comment => (
        <Comment id={comment.id} key={comment.id} avatarSrc={comment.avatarSrc} text={comment.text} author={comment.author} category={comment.category} children={comment.children} created_utc={comment.created_utc} />
      ))}
    </ul>
   </li>
  );
}
