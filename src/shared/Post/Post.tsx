import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate  } from "react-router-dom";
import { KarmaCounter } from '../CardsList/Card/Controls/KarmaCounter';
import { ReturnArrow } from '../Icons/ReturnArrow';
import { Comments } from './Comments';
import styles from './post.less';
import { PostCommentContent } from './PostContent';
import { PostControls } from './PostControls';
import { ButtonComment } from './PostControls/ButtonComment';
import { ButtonPostComplain } from './PostControls/ButtonPostComplain';
import { ButtonPostHide } from './PostControls/ButtonPostHide';
import { ButtonPostSave } from './PostControls/ButtonPostSave';
import { ButtonPostShare } from './PostControls/ButtonPostShare';
import { PostHeader } from './PostHeader';

interface IPost{
    title: string,
    author: string,
    category?: string,
    description?: string,
    onClose?: ()=> void,
    cardId: string,
    avatar?: string,
}
export function Post(props: IPost){
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(()=> {
        function handleClick(event: MouseEvent){
            if(event.target instanceof Node && !ref.current?.contains(event.target))
                //props.onClose?.();
                navigate('/');
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, []);

    //const node = document.getElementById(`card${props.cardId}`);
    const node = document.querySelector('#modal_root');
    if(!node) return null

    return ReactDOM.createPortal((
        <div id={'post'} ref={ref} className={styles.post}>
        <button onClick={props.onClose} className={styles.buttonReturn}><ReturnArrow/></button>
       <div>
         <PostHeader cardId={props.cardId} idContainerResultMenu={'post'} />
       </div>
       <div className={styles.textContent}>
       <div className={styles.metaData}>
         <div className={styles.userLink}>
           <img className={styles.avatar} src="https://cdn.dribbble.com/users/1210339/screenshots/15111625/media/e92f64535c708861a43715f61efe3a97.jpg" alt="avatar" />
           <a href="#user-url" className={styles.username}>{props.author}</a>
         </div>
         <span className={styles.createdAt}>
           <span className={styles.publishedLabel}>опубликовано</span>
           4 часа назад</span>
           <span className={styles.category}>{props.category}</span>
       </div>
       <h2 className={styles.title}>
           {props.title}
       </h2>
       </div>
     <PostCommentContent />
     <PostControls>
       <div className={styles.karma}>
       <KarmaCounter />
       </div>
       <ButtonComment />
       <div className={styles.buttonGroup}>
       <ButtonPostShare />
       <ButtonPostHide />
       <ButtonPostSave />
       <ButtonPostComplain />
       </div>
       <div className={styles.textStatistic}>{67} %<span className={styles.hideMobile}>проголосовали</span></div>
       </PostControls>
     <Comments />
     </div>
   ), node);
 }
 