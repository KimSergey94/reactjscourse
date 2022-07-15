import React from 'react';
import styles from './preview.less';
import postThumbnail from '../../../../assets/images/postThumbnail.jpg';

export interface IPreviewProps{
    imgSrc: string;
}
export function Preview(props: IPreviewProps){
    return (
        <div className={styles.preview}>
            <img className={styles.previewImg} src={!props.imgSrc || props.imgSrc === 'self' || props.imgSrc === 'default' ? postThumbnail : props.imgSrc} />
        </div>
        );
}