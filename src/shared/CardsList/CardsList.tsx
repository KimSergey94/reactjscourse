import React, { useContext } from "react";
import { postsContext } from "../context/postsContext";
import { Card } from "./Card/Card";
import styles from './cardslist.less';
import { ICardMenuOpened } from "./Card/Menu";

export function CardsList() {
    const posts = useContext(postsContext);
    var cards:ICardMenuOpened = {cards:[]};
    posts?.filter(function(x){cards.cards.push({isOpened:false, cardId: posts.indexOf(x)})});
    return (
        <ul className={styles.cardsList}>
            
            {posts?.map((x) => <Card key={posts.indexOf(x)} cardId={posts.indexOf(x)} content={x.content} preview={x.preview} controls={x.controls} cards={cards||[]}/>)}
        </ul>
    );
}