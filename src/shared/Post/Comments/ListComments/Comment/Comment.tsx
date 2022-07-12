import { createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';
import React, { ChangeEvent, useContext, useState } from 'react';
import { generateRandomString } from '../../../../../utils/react/generateRandomIndex';
import { userContext } from '../../../../context/userContext';
import { IconAnon } from '../../../../Icons/IconAnon';
import { FormCommentsContainer } from '../../FormCommentsContainer';
import { CommentBar } from '../CommentBar';
import styles from './comment.less';
interface IComment {
  author: string,
  categoryLeague: string,
  commentText: string ,
  avatarSrc?: string,
  id: string,
  subCommentList?: {
    autor: string;
    text: string;
    category: string;
    avatarSrc: string;
    id: string;
  }[];
  arrFullComments: IFullListComments [];
}

interface IFullListComments {
  autor: string;
  text: string;
  category: string;
  avatarSrc: string;
  id: string
  listSubComments?: {
  autor: string;
    text: string;
    category: string;
    avatarSrc: string;
    id: string
  } [];
}

const updateComment = createEvent<string>();
const $comment = createStore('Привет, Effector! ')
  .on(updateComment, (_, newValue) => newValue);

  $comment.watch((state)=>{
    console.log(`state: ${state}`);
  });
  
export function Comment({author, categoryLeague, commentText, avatarSrc, subCommentList = [], arrFullComments, id}: IComment) {
  const value = useStore($comment);

  function handleClickedOut () {
    setVisibleForm(true);//false
  }
  function handleClickComment () {
   setVisibleForm(!isVisibleForm);
  }
  const [subComments, setSubCommentList] = useState(subCommentList);
  const [isVisibleForm , setVisibleForm] = useState(false);
  // const [value , setValue] = useState(`${author}, `);
  const {data, loading } = useContext(userContext);
  function submitForm(comment:string) {
    if(!data?.name) {
      console.log('Нужно авторизоваться')
      return
    }
    setSubCommentList([...subComments, { autor: data?.name? data?.name : 'Неизвестный' , text: comment , category: 'Разработчик', avatarSrc: data?.iconImg ? data?.iconImg : '', id: generateRandomString()
  } ])
  updateComment('');
  setVisibleForm(false);
  }
  
  function handleChange (e: ChangeEvent<HTMLTextAreaElement>) {
    updateComment(`${e.target.value}`);
  }
  return (
   <li className={`${styles.comment}`}>
     <div className={styles.header}>
    <span className={styles.category}>{categoryLeague}</span>
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
       4 часа назад</span>
  </div>
  </div>
    <div className={styles.text}>{commentText}</div>
    <CommentBar handleClickComment={handleClickComment}/>
    {isVisibleForm && (
      <FormCommentsContainer handleClicked={handleClickedOut} valueInput={value} handleSubmit={submitForm} name={data?.name} handleChange={handleChange} />
      // <FormComments handleClicked={handleClickedOut} valueInput={`${value}`} handleSubmit={submitForm} handleChange={handleChange}/>
    )}
    <ul className={styles.list}>
    {subComments.map(post => (
        <Comment id={post.id} key={post.id}  arrFullComments={arrFullComments} avatarSrc={post.avatarSrc} commentText={post.text} author={post.autor} categoryLeague={post.category} />
      ))}
    </ul>
   </li>
  );
}
