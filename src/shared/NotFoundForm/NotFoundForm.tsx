import React from 'react';
import { Link } from 'react-router-dom';
import styles from './notfoundform.less';

export function NotFoundForm() {
    return (
        <div className={styles.notFoundForm}>
            <span className={styles.notFoundFormMessage}>404 — страница не найдена</span>
            <Link to="/">Вернуться на главную страницу</Link>
        </div>
        
    );
}