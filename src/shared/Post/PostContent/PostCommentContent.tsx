import React from 'react';
import { Text } from '../../Text';
import styles from './postcontent.less';
import thumbnail from '../../../assets/images/postThumbnail.jpg';

interface IPostContent {
 image?: string;
}
export function PostCommentContent({image}: IPostContent) {
  return (
    <div className={styles.container}>
       <img className={styles.previewImg} src={!image || image === 'default' || image === 'self' ? thumbnail : image} alt="Фоновая картинка карточки" />
    </div>
  );
}
