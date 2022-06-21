import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
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
    const [nextAfter, setNextAfter] = useState('');
    const [intersectionCounter, setIntersectionCounter] = useState(-1);
    const [showLoadBtn, setShowLoadBtn] = useState(false);
    const [loadMoreTrigger, setLoadMoreTrigger] = useState(false);
    
    const bottomOfList = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        async function load(){
            setLoading(true);
            setErrorLoading('');

            try{
                const {data: {data: {after, children}}} = await axios.get('https://oauth.reddit.com/rising/', 
                {
                    headers: {Authorization: `bearer ${token}`}, 
                    params: {
                        limit:2,
                        after:nextAfter,
                    }
                });
                const cardProps: ICardProps[] = [];
                children.map((x:any)=>{
                    console.log(x);
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
                setNextAfter(after);
                console.log('after',after);
                console.log('nextAfter',nextAfter);
                setCardPosts(prevChildren => prevChildren.concat(...cardProps));

            }
            catch(err){
                console.error(err);
                setErrorLoading(String(err));
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
        <ul className={styles.cardsList}>
            {posts?.length === 0 && !loading && !errorLoading && (
                <div style={{textAlign: 'center'}}>Нет ни одного поста</div>
            )}

            {cardProps?.map((x) => <Card key={x.cardId} content={x.content} preview={x.preview} controls={x.controls} cardId={x.cardId}/>)}
            {/* {posts?.map((x) => <Card key={x.data.id} content={x.content} preview={x.preview} controls={x.controls} cardId={posts.indexOf(x.data.id)}/>)} */}

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
    );
}