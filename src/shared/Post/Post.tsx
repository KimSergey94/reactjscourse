import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { useNavigate, useParams  } from "react-router-dom";
import { RootState } from '../../store/store';
import { KarmaCounter } from '../CardsList/Card/Controls/KarmaCounter';
import { ReturnArrow } from '../Icons/ReturnArrow';
import { Comments, ICommentsList } from './Comments';
import styles from './post.less';
import { PostCommentContent } from './PostContent';
import { PostControls } from './PostControls';
import { ButtonComment } from './PostControls/ButtonComment';
import { ButtonPostComplain } from './PostControls/ButtonPostComplain';
import { ButtonPostHide } from './PostControls/ButtonPostHide';
import { ButtonPostSave } from './PostControls/ButtonPostSave';
import { ButtonPostShare } from './PostControls/ButtonPostShare';
import { PostHeader } from './PostHeader';
import {IRedditData, IRedditListingResponseData, IRedditT3ResponseData} from '../CardsList/CardsList';
import moment from 'moment';
import avatar from '../../assets/images/avatar.jpg';

interface IPost{
    title: string,
    author: string,
    category?: string,
    description?: string,
    onClose?: ()=> void,
    cardId: string,
    avatar?: string,
}
export interface IRedditCommentsResponseData{
  data: IRedditListingResponseData[];
}
interface IPostComment{
  text: string;
  children?: IPostComment[];
}
export function Post(props: IPost){
    const navigate = useNavigate();
    const {id} = useParams();
    const ref = useRef<HTMLDivElement>(null);
    const token = useSelector<RootState>(state=> state.token);
    const [nextAfter, setNextAfter] = useState('');
    const [postInfo, setPostInfo] = useState<IRedditData>({} as IRedditData);
    const [postComments, setPostComments] = useState<IPostComment[]>([]);
    const [commentsList, setCommentsList] = useState<ICommentsList[]>([]);
    const [commentsLoading, setCommentsLoading] = useState(false);

    function iterateChildren(x:IRedditT3ResponseData[]):ICommentsList[]
    {
      var result:ICommentsList[] = []; 
      x.forEach(xx=>{
        if(xx.data.body){
          let comment:ICommentsList = {
            text: xx.data.body,
            children: [],
            author: xx.data.author,
            category: xx.data.subreddit,
            avatarSrc: xx.data.thumbnail,
            id: xx.data.id,
            created_utc: xx.data.created_utc,
          };
          if(xx.data?.replies?.data?.children)
            comment.children = iterateChildren(xx.data?.replies?.data?.children);
          result.push(comment);
        }
      });
      return result;
    }    

    useEffect(()=> {
        function handleClick(event: MouseEvent){
            if(event.target instanceof Node && !ref.current?.contains(event.target))
                navigate('/posts');
        }

        async function load(){
          setCommentsLoading(true);
          try{
            const commentsData:IRedditCommentsResponseData  = await axios.get(`https://oauth.reddit.com/comments/${id}`, 
            {
                headers: {Authorization: `bearer ${token}`},
                params: {
                  limit:5,
                  after:nextAfter,
              }
            });
            if(commentsData?.data[0]?.data.children[0]?.data) setPostInfo(commentsData?.data[0]?.data.children[0]?.data);
            if(commentsData?.data[1]?.data?.children) setCommentsList(iterateChildren(commentsData?.data[1]?.data.children));

            console.log('postInfo',commentsData?.data[0]?.data.children[0]?.data);
          }
          catch(err){
            console.error(err);
          }
          
          setCommentsLoading(false);
        }
        load();

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, []);
    
    const node = document.querySelector('#modal_root');
    if(!node) return null

    return ReactDOM.createPortal((
        <div id='post' ref={ref} className={styles.post}>

          {postComments.map((x)=> <span>{x.text}</span>)}

        <button onClick={props.onClose} className={styles.buttonReturn}><ReturnArrow/></button>
       <div>
         <PostHeader cardId={props.cardId} idContainerResultMenu={'post'} />
       </div>
       <div className={styles.textContent}>
       <div className={styles.metaData}>
         <div className={styles.userLink}>
           <img className={styles.avatar} src={avatar} alt="avatar" />
           <a href="#user-url" className={styles.username}>{props.author}</a>
         </div>
         <span className={styles.createdAt}>
           <span className={styles.publishedLabel}>опубликовано</span>
           {postInfo.created_utc ? moment.unix(parseInt(postInfo.created_utc)).fromNow() : ''}</span>
           <span className={styles.category}>{props.category}</span>
       </div>
       <h2 className={styles.title}>
           {postInfo.title}
       </h2>
       </div>
     <PostCommentContent image={postInfo.thumbnail}/>
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
     <Comments commentsList={commentsList} />
     </div>
   ), node);
 }
 