import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import avatar from '../../assets/images/avatar.jpg'
import { KarmaCounter } from '../CardsList/Card/Controls/KarmaCounter'
import { Content } from '../components/Content'
import { ReturnArrow } from '../components/Icons/ReturnArrow'
import { IRedditData } from '../lib/js/CardsListHelper'
import {
  IPost,
  IRedditCommentsResponseData,
  iterateAndCountComments,
  iterateChildren,
} from '../lib/js/PostHelper'
import { RootState } from '../lib/react/store/store'
import { Comments, ICommentsList } from './Comments'
import styles from './post.less'
import { PostCommentContent } from './PostContent'
import { ButtonComment } from './PostControls/ButtonComment'
import { ButtonPostComplain } from './PostControls/ButtonPostComplain'
import { ButtonPostHide } from './PostControls/ButtonPostHide'
import { ButtonPostSave } from './PostControls/ButtonPostSave'
import { ButtonPostShare } from './PostControls/ButtonPostShare'
import { PostHeader } from './PostHeader'

export function Post(props: IPost) {
  const navigate = useNavigate()
  const { id } = useParams()
  const ref = useRef<HTMLDivElement>(null)
  const token = useSelector<RootState>((state) => state.token)
  const [postInfo, setPostInfo] = useState<IRedditData>({} as IRedditData)
  const [commentsList, setCommentsList] = useState<ICommentsList[]>([])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target))
        navigate('/posts')
    }

    async function load() {
      try {
        const commentsData: IRedditCommentsResponseData = await axios.get(
          `https://oauth.reddit.com/comments/${id}`,
          {
            headers: { Authorization: `bearer ${token}` },
            params: {
              limit: 5,
            },
          }
        )
        if (commentsData?.data[0]?.data.children[0]?.data)
          setPostInfo(commentsData?.data[0]?.data.children[0]?.data)
        if (commentsData?.data[1]?.data?.children)
          setCommentsList(iterateChildren(commentsData?.data[1]?.data.children))
      } catch (err) {
        console.error(err)
      }
    }
    load()

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  const node = document.querySelector('#modal_root')
  if (!node) return null

  return ReactDOM.createPortal(
    <div id="post" ref={ref} className={styles.post}>
      <button onClick={props.onClose} className={styles.buttonReturn}>
        <ReturnArrow />
      </button>
      <div>
        <PostHeader cardId={props.cardId} idContainerResultMenu={'post'} />
      </div>
      <div className={styles.textContent}>
        <div className={styles.metaData}>
          <div className={styles.userLink}>
            <img className={styles.avatar} src={avatar} alt="avatar" />
            <a href="#user-url" className={styles.username}>
              {props.author}
            </a>
          </div>
          <span className={styles.createdAt}>
            <span className={styles.publishedLabel}>опубликовано</span>
            {postInfo.created_utc
              ? moment.unix(parseInt(postInfo.created_utc)).fromNow()
              : ''}
          </span>
          <span className={styles.category}>{props.category}</span>
        </div>
        <h2 className={styles.title}>{postInfo.title}</h2>
      </div>
      <PostCommentContent image={postInfo.thumbnail} />
      <Content>
        <div className={styles.karma}>
          <KarmaCounter score={postInfo.score} />
        </div>
        <ButtonComment totalComments={iterateAndCountComments(commentsList)} />
        <div className={styles.buttonGroup}>
          <ButtonPostShare />
          <ButtonPostHide />
          <ButtonPostSave />
          <ButtonPostComplain />
        </div>
        <div className={styles.textStatistic}>
          {67} %<span className={styles.hideMobile}>проголосовали</span>
        </div>
      </Content>
      <Comments commentsList={commentsList} />
    </div>,
    node
  )
}
