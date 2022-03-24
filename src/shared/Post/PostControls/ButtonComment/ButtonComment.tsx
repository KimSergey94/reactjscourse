import React from 'react';
import { ButtonCommentsIcon } from '../../../Icons/ButtonCommentsIcon';
import styles from './buttoncomment.less';

export function ButtonComment() {
  return (
    <button className={styles.button}>
      <ButtonCommentsIcon />
      <span>{`${27}`}<span className={styles.spanHide}>коментариев</span></span>
      
    </button>
  );
}
