import React, { ChangeEvent, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateComment } from '../../../store/store';
import { generateId, generateRandomString } from '../../../utils/react/generateRandomIndex';
import { userContext } from '../../context/userContext';
import styles from './comments.less';
import { FormCommentsContainer } from './FormCommentsContainer';
import { ListComments } from './ListComments';
import { SortComments } from './SortComments';


const listComments = [
  {autor:'петр', text: 'Какой-то текст', category: 'It', avatarSrc: '', listSubComments: [
    {autor:'Андрей', text: 'Какой-то текст', category: 'It', avatarSrc: '', id: generateRandomString()}
  ]
},
{autor:'петр', text: 'Какой-то текст', category: 'Робототехника',avatarSrc: ''
},
].map(generateId)

export function Comments() {
  const value = useSelector<RootState, string>(state => state.commentText);
  const dispatch = useDispatch();
  function onChange(event: ChangeEvent<HTMLTextAreaElement>){
      dispatch(updateComment(event.target.value));
  }
  const {data, loading } = useContext(userContext);
  const [list, setList] = useState(listComments);

  function handleSubmitForm (comment:string) {
    if (!data?.name) {
      console.log('Что бы оставить комментарий авторизуйтесь')
      return
    }
    setList([...list, { autor: data?.name , text: comment , category: 'Разработчик', avatarSrc: data?.iconImg ? data?.iconImg : '', id: generateRandomString() }] );
  }
  
  return (
    < div className={styles.container}>
      <SortComments />
      <FormCommentsContainer name={data?.name} handleSubmit={handleSubmitForm} valueInput={value} />
      {/* <FormComments name={name} handleSubmit={handleSubmitForm} handleChange={onChange} valueInput={value} /> */}
      <ListComments list={list} />
    </div>
  );
}
