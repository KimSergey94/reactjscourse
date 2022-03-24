import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { generateId, generateRandomString } from '../../../utils/react/generateRandomIndex';
import { commentContext } from '../../context/commentContext';
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
  const {value, onChange} = useContext(commentContext);
  const {name, iconImg } = useContext(userContext);
  const [list, setList] = useState(listComments);
  function handleChangeInput(e: ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault()
    onChange(`${e.target.value}`);
  }; 
  function handleSubmitForm (e: FormEvent) {
    e.preventDefault();
    if (!name) {
      console.log('Что бы оставить комментарий авторизуйтесь')
      return
    }
    setList([...list, { autor: name , text: value , category: 'Разработчик', avatarSrc: iconImg ? iconImg : '', id: generateRandomString()
  }] );
  onChange('')
  }
  
  return (
    < div className={styles.container}>
      <SortComments />
      <FormComments name={name} handleSubmit={handleSubmitForm} handleChange={handleChangeInput} valueInput={value} />
      <ListComments list={list} />
    </div>
  );
}
