import React from "react";
import styles from './card.less';
import { Controls } from "./Controls/Controls";
import { Menu } from "./Menu/Menu";
import { Preview } from "./Preview/Preview";
import { TextContent } from "./TextContent/TextContent";

export function Card(){
    return(
        <li className={styles.card}>
            <TextContent/>
            <Preview/>
            <Menu />
            <Controls/>
        </li>
    );
}
