import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateComment } from '../../../store';
import { generateId, generateRandomString } from '../../../utils/react/generateRandomIndex';
import { userContext } from '../../context/userContext';
import styles from './comments.less';
import { FormComments } from './FormComments';
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
  const {name, iconImg } = useContext(userContext);
  const [list, setList] = useState(listComments);
  function handleSubmitForm (e: FormEvent) {
    e.preventDefault();
    if (!name) {
      console.log('Что бы оставить комментарий авторизуйтесь')
      return
    }
    setList([...list, { autor: name , text: value , category: 'Разработчик', avatarSrc: iconImg ? iconImg : '', id: generateRandomString()
  }] );
  //onChange('')
  }
  
  return (
    < div className={styles.container}>
      <SortComments />
      <FormComments name={name} handleSubmit={handleSubmitForm} handleChange={onChange} valueInput={value} />
      <ListComments list={list} />
    </div>
  );
}
