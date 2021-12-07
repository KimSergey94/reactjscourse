import React, { Children } from 'react';
import { hot } from 'react-hot-loader/root';
import styles from './layout.less';

interface ILayoutProps{
    children?: React.ReactNode;
}

export function Layout({children}:ILayoutProps) {
    return (
        <div className={styles.layout}>
            {children}
        </div>
    );
}