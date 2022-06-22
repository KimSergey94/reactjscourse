import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { useNavigate, useParams  } from "react-router-dom";
import { RootState } from '../../store/store';
import { ICardProps } from '../CardsList/Card';
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

  const params = useParams();

    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const token = useSelector<RootState>(state=> state.token);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const cardPropsList = useSelector<RootState, ICardProps[]>(state => state.cardProps);
    useEffect(()=> {
        function handleClick(event: MouseEvent){
            if(event.target instanceof Node && !ref.current?.contains(event.target))
                //props.onClose?.();
                navigate('/');
        }

        async function load(){
          setCommentsLoading(true);
          try{
            const data = await axios.get(`https://oauth.reddit.com/comments/${props.cardId}`, 
            {
                headers: {Authorization: `bearer ${token}`}
            });
            console.log('data', data);
          }
          catch(err){
            console.error(err);
          }
          
          setCommentsLoading(false);
        }
        load();

        document.addEventListener('click', handleClick);
        return () => {
          console.log('post comments load props.cardId',props.cardId);
          console.log('params',params);
        
            document.removeEventListener('click', handleClick);
        }
    }, []);

    
    console.log('2post comments load props.cardId',props.cardId);
    console.log('2params',params);
  

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
 