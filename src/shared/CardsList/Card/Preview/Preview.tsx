import React from 'react';
import styles from './preview.less';

export interface IPreviewProps{
    imgSrc: string;
}
export function Preview(props: IPreviewProps){
    return (
        <div className={styles.preview}>
            <img className={styles.previewImg} src={props.imgSrc} />
        </div>
        );
}