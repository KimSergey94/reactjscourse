import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { postsContext } from "../context/postsContext";
import { Card, ICardProps } from "./Card/Card";
import styles from './cardslist.less';

export function CardsList() {
    const posts = useContext(postsContext);
    const token = useSelector<RootState>(state=> state.token);
    const [cardProps, setCardPosts] = useState<ICardProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorLoading, setErrorLoading] = useState('');
    useEffect(()=>{
        if(!token) return;

        async function load(){
            setLoading(true);
            setErrorLoading('');

            try{
                const {data: {data: {children}}} = await axios.get('https://oauth.reddit.com/rising/', {headers: {Authorization: `bearer ${token}`}})
                const cardProps: ICardProps[] = [];
                children.map((x:any)=>{
                    const cardProp: ICardProps = {
                        content: {
                            displayName: x.data.author || x.data.name,
                            postedTimeAgo: x.data.created,
                            title: x.data.title,
                            imgLink: x.data.thumbnail,
                            cardId: x.data.id,
                            isCommentModalOpened: false,
                            handleOpenCommentModal: ()=>{}
                        },
                        preview: {
                            imgSrc: x.data.thumbnail
                        },
                        controls: {
                            karmaValue: x.data.ups,
                            commentsNumber: x.data.score
                        },
                        cardId: x.data.id
                    };
                    cardProps.push(cardProp);
                });
                setCardPosts(cardProps);

            }
            catch(err){
                console.error(err);
                setErrorLoading(String(err));
            }

            setLoading(false);
        }

        load();
    }, [token]);
    return (
        <ul className={styles.cardsList}>
            {posts?.length === 0 && !loading && !errorLoading && (
                <div style={{textAlign: 'center'}}>Нет ни одного поста</div>
            )}

            {cardProps?.map((x) => <Card key={x.cardId} content={x.content} preview={x.preview} controls={x.controls} cardId={x.cardId}/>)}
            {/* {posts?.map((x) => <Card key={x.data.id} content={x.content} preview={x.preview} controls={x.controls} cardId={posts.indexOf(x.data.id)}/>)} */}

            {loading && (
                <div style={{textAlign: 'center'}}>Загрузка...</div>
            )}

            {errorLoading && (
                <div role="alert" style={{textAlign: 'center'}}>
                    {errorLoading}
                </div>
            )}
        </ul>
    );
}