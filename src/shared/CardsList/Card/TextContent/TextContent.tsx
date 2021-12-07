import React from 'react';
import styles from './textcontent.less';

export function TextContent(){
    return (
        <div className={styles.textContent}>
        <div className={styles.metaData}>
            <div className={styles.userLink}>
                <img className={styles.avatar} src="https://images.unsplash.com/profile-fb-1527368999-01bec71421e9.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128" alt="avatar" />
                <a href="#user-url" className={styles.username}>Дмитрий Гришин</a>
            </div>
            <span className={styles.createdAt}><span className={styles.publishedLabel}>опубликовано </span>4 часа назад</span>
        </div>
        <h2 className={styles.title}>
            <a href="#post-url" className={styles.postLink}>Следует отметить, что новая модель организационной деятельности Следует отметить, что новая модель организационной деятельности</a>
        </h2>
    </div>
    );
}