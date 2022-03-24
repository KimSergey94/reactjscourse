import React, { ChangeEvent, FormEvent, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { generateRandomString } from '../../../../../utils/react/generateRandomIndex';
import { userContext } from '../../../../context/userContext';
import { IconAnon } from '../../../../Icons/IconAnon';
import { FormComments } from '../../FormComments';
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
//   autor: string;
//   text: string;
//   category: string;
//   avatarSrc: string;
//   listSubComments?: {
//     autor: string;
//     text: string;
//     category: string;
//     avatarSrc: string;
// } [];
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
export function Comment({author, categoryLeague, commentText, avatarSrc, subCommentList = [], arrFullComments, id}: IComment) {
function handleClickedOut () {
  setVisibleForm(false);
}
  function handleClickComment () {
   setVisibleForm(!isVisibleForm);
  
  }
  const [subComments, setSubCommentList] = useState(subCommentList);
  const [isVisibleForm , setVisibleForm] = useState(false);
  const [value , setValue] = useState(`${author}, `);
  const {name, iconImg } = useContext(userContext);
  function submitForm (e: FormEvent) {
    e.preventDefault();
    if(!name) {
      console.log('Нужно автоизоваться')
      return}
    setSubCommentList([...subComments, { autor: name? name : 'Неизвестный' , text: value , category: 'Разработчик', avatarSrc: iconImg ? iconImg : '', id: generateRandomString()
  } ])
  setValue('');
  setVisibleForm(false)
  }
  function handleChange (e: ChangeEvent<HTMLTextAreaElement>) {
    setValue(`${e.target.value}`)
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
      <FormComments handleClicked={handleClickedOut} valueInput={`${value}`} handleSubmit={submitForm} handleChange={handleChange}/>
    )}
    <ul className={styles.list}>
    {subComments.map(post => (
        <Comment id={post.id} key={post.id}  arrFullComments={arrFullComments} avatarSrc={post.avatarSrc} commentText={post.text} author={post.autor} categoryLeague={post.category} />
      ))}
    </ul>
   </li>
  );
}
