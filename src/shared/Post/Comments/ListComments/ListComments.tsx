import React from 'react';
import { ICommentsProps } from '../Comments';
import { Comment } from './Comment';
import styles from './listcomments.less';

export function ListComments({commentsList}: ICommentsProps) {

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
      {commentsList.map(comment => (
        <Comment key={comment.id} id={comment.id} avatarSrc={comment.avatarSrc} text={comment.text} author={comment.author} category={comment.category} children={comment.children} created_utc={comment.created_utc}/>
      ))}
      </ul>
    </div>
  );
}
