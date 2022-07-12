import React from "react";
import styles from './threadtitle.less';
import img from '../../../assets/images/logo.png';

export function ThreadTitle(){
    return(
        <div className={styles.threadTitle}>
            <img src={img} className={styles.threadLogo} />
        </div>
    );
}