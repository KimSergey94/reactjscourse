import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import styles from './header.less';
import {concat} from './3.8'

function Header() {
    console.log(styles, styles.example);
    console.log(concat('Hello','World'));
    
    return (
        <header>
            <h1 className={styles.example}>Hello React</h1>
        </header>
    );
}

export const Header = hot(Header);