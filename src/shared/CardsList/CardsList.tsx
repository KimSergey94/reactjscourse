import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState, updateCardProps } from "../../store/store";
import { Card, ICardProps } from "./Card/Card";
import styles from './cardslist.less';

export interface IRedditResponseData{
    data: IRedditListingResponseData;
}
export interface IRedditListingResponseData {
    data: {
        after: string;
        before: string;
        children: IRedditT3ResponseData[];
        geo_filter: string;
    };
    kind: string;
}
export interface IRedditT3ResponseData{
    data: IRedditData;
    kind: string;
}
export interface IRedditData {
    author: string;
    body: string;
    body_html: string;
    created: string;
    created_utc: string;
    id: string;
    permalink: string;
    subreddit: string;
    name: string;
    title: string;
    thumbnail: string;
    ups: number;
    score: number;
    replies: IRedditListingResponseData;
}


export function CardsList() {
    const token = useSelector<RootState>(state=> state.token);
    const [loading, setLoading] = useState(false);
    const [errorLoading, setErrorLoading] = useState('');
    const [nextAfter, setNextAfter] = useState('');
    const [intersectionCounter, setIntersectionCounter] = useState(-1);
    const [showLoadBtn, setShowLoadBtn] = useState(false);
    const [loadMoreTrigger, setLoadMoreTrigger] = useState(false);
    const dispatch = useDispatch();
    const [cardProps, setCardPosts] = useState<ICardProps[]>([]);
    const cardPropsList = useSelector<RootState, ICardProps[]>(state => state.cardProps);

    
    const bottomOfList = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        async function load(){
            setLoading(true);
            setErrorLoading('');

            try{
                const risingResponse:IRedditResponseData = await axios.get('https://oauth.reddit.com/rising/', 
                {
                    headers: {Authorization: `bearer ${token}`}, 
                    params: {
                        limit:5,
                        after:nextAfter,
                    }
                });
                if(risingResponse.data.data.after == nextAfter) alert(11111);
                const cardPropsTemp: ICardProps[] = risingResponse.data.data.children?.map((x)=>{
                    return {
                        content: {
                            displayName: x.data.author || x.data.name,
                            postedTimeAgo: x.data.created,
                            title: x.data.title,
                            imgLink: x.data.thumbnail,
                            cardId: x.data.id,
                            // isCommentModalOpened: false,
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
                });
                setNextAfter(risingResponse.data.data.after);
                setCardPosts(prevChildren => prevChildren.concat(...cardPropsTemp));
                dispatch(updateCardProps(cardProps));
            }
            catch(err){
                console.error(err);
                setErrorLoading('Не удалось загрузить посты.');
            }

            setLoading(false);
        }


        const observer = new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting && nextAfter !== null && !loadMoreTrigger) {
                setIntersectionCounter(intersectionCounter + 1);
                if(intersectionCounter > 2 && intersectionCounter % 3 === 0){
                    setShowLoadBtn(true);
                }
                else{
                    load();
                    setShowLoadBtn(false);
                }
            }
        },
        {
            rootMargin: '10px',
        });

        if(bottomOfList.current){
            observer.observe(bottomOfList.current);
        }

        if(loadMoreTrigger){
            load();
            setLoadMoreTrigger(false);
        }
        
        return ()=>{
            if(bottomOfList.current){
                observer.unobserve(bottomOfList.current);
            }
        }
    }, [bottomOfList.current, nextAfter, token, loadMoreTrigger]);

    return (
        <>
            <ul className={styles.cardsList}>
                {cardProps?.length === 0 && !loading && !errorLoading && (
                    <div style={{textAlign: 'center'}}>Нет ни одного поста</div>
                )}

                {cardProps?.map((x) => <Card key={x.cardId} content={x.content} preview={x.preview} controls={x.controls} cardId={x.cardId}/>)}

                <div ref={bottomOfList}/>
                {loading && (
                    <div style={{textAlign: 'center'}}>Загрузка...</div>
                )}
                {showLoadBtn && (
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <button style={{textAlign: 'center'}} onClick={() => setLoadMoreTrigger(true)}>Загрузить еще</button>
                    </div>
                )}

                {errorLoading && (
                    <div role="alert" style={{textAlign: 'center'}}>
                        {errorLoading}
                    </div>
                )}
            </ul>
            <Outlet />
        </>
    );
}