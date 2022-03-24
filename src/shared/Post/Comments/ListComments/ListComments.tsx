import React from 'react';
import { Comment } from './Comment';
import styles from './listcomments.less';
export interface IListComments {
  list: {
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
}[]
}
export function ListComments({list}: IListComments) {

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
      {list.map(post => (
        <Comment key={post.id} id={post.id}  arrFullComments={list} avatarSrc={post.avatarSrc} commentText={post.text} author={post.autor} categoryLeague={post.category} subCommentList={post.listSubComments} />
      ))}
      </ul>
    </div>
  );
}
