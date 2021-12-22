import React from 'react';
import styles from './preview.less';

export function Preview(){
    return (
        <div className={styles.preview}>
            <img className={styles.previewImg} src="https://pfps.gg/assets/pfps/4023-cute-fox.png" />
        </div>
        );
}