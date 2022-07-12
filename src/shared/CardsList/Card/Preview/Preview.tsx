import React from 'react';
import styles from './preview.less';

export interface IPreviewProps{
    imgSrc: string;
}
export function Preview(props: IPreviewProps){
    return (
        <div className={styles.preview}>
            <img className={styles.previewImg} src={props.imgSrc === 'self' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsunZB72U_wM9FqVM5I5cioBbzFUZtKw8bng&usqp=CAU' : props.imgSrc} />
        </div>
        );
}