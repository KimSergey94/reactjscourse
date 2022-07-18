import React from 'react'
import thumbnail from '../../../assets/images/postThumbnail.jpg'
import styles from './postcontent.less'

interface IPostContent {
  image?: string
}
export function PostCommentContent({ image }: IPostContent) {
  return (
    <div className={styles.container}>
      <img
        className={styles.previewImg}
        src={
          !image || image === 'default' || image === 'self' ? thumbnail : image
        }
        alt="Фоновая картинка карточки"
      />
    </div>
  )
}
