import React from 'react'
import postThumbnail from '../../../../assets/images/postThumbnail.jpg'
import styles from './preview.less'

export interface IPreviewProps {
  imgSrc: string
}
export function Preview(props: IPreviewProps) {
  return (
    <div className={styles.preview}>
      <img
        className={styles.previewImg}
        src={
          !props.imgSrc || props.imgSrc === 'self' || props.imgSrc === 'default'
            ? postThumbnail
            : props.imgSrc
        }
      />
    </div>
  )
}
