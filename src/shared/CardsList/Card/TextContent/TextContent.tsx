import React from 'react';
import styles from './textcontent.less';

export interface ITextContentProps{
    displayName: string;
    postedTimeAgo: string;
    title: string;
    imgLink: string;
}
export function TextContent(props:ITextContentProps){
    return (
        <div className={styles.textContent}>
        <div className={styles.metaData}>
            <div className={styles.userLink}>
                <img className={styles.avatar} src={props.imgLink} alt="avatar" />
                <a href="#user-url" className={styles.username}>{props.displayName}</a>
            </div>
            <span className={styles.createdAt}><span className={styles.publishedLabel}>опубликовано </span>{props.postedTimeAgo}</span>
        </div>
        <h2 className={styles.title}>
            <a href="#post-url" className={styles.postLink}>{props.title}</a>
        </h2>
    </div>
    );
}