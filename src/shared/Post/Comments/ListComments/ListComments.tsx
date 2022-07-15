import React from 'react';
import { ICommentsProps } from '../Comments';
import { Comment } from './Comment';
import styles from './listcomments.less';

export function ListComments({commentsList}: ICommentsProps) {

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
      {commentsList.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
      </ul>
    </div>
  );
}
