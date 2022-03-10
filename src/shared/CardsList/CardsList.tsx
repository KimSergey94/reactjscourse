import React, { useContext } from "react";
import { postsContext } from "../context/postsContext";
import { Card } from "./Card/Card";
import styles from './cardslist.less';

export function CardsList() {
    const posts = useContext(postsContext);
    return (
        <ul className={styles.cardsList}>
            {posts?.map((x) => <Card key={posts.indexOf(x)} cardId={posts.indexOf(x)} content={x.content} preview={x.preview} controls={x.controls} />)}
        </ul>
    );
}