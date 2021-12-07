import React from "react";
import { Card } from "./Card/Card";
import styles from './cardslist.less';

export function CardsList() {
    return (
        <ul className={styles.cardsList}>
            <Card />
        </ul>
    );
}