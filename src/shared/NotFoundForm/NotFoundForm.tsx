import React from 'react';
import styles from './notfoundform.less';

export function NotFoundForm() {
    return (
        <div className={styles.notFoundForm}>
            <span className={styles.notFoundFormMessage}>404 — страница не найдена</span>
        </div>
    );
}