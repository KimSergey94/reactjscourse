import React from 'react';
import { Text } from '../../Text';
import styles from './postcontent.less';
interface IPostContent {
 image?: string;
}
export function PostCommentContent({image = "https://cdn.dribbble.com/users/23569/screenshots/16866943/media/73905b86a31b8c2c11f773e7654707b3.png?compress=1&resize=800x600"}: IPostContent) {
  return (
    <div className={styles.container}>
       <img className={styles.previewImg} src={image} alt="Фоновая картинка карточки" />
    </div>
  );
}
