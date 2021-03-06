import React from 'react'
import { Link } from 'react-router-dom'
import styles from './textcontent.less'

export interface ITextContentProps {
  displayName: string
  postedTimeAgo: string
  title: string
  imgLink: string
  cardId: string
  handleOpenCommentModal: () => void
}
export function TextContent(props: ITextContentProps) {
  return (
    <div className={styles.textContent}>
      <div className={styles.metaData}>
        <div className={styles.userLink}>
          <img
            className={styles.avatar}
            src={
              props.imgLink === 'self'
                ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsunZB72U_wM9FqVM5I5cioBbzFUZtKw8bng&usqp=CAU'
                : props.imgLink
            }
            alt="avatar"
          />
          <a href="#user-url" className={styles.username}>
            {props.displayName}
          </a>
        </div>
        <span className={styles.createdAt}>
          <span className={styles.publishedLabel}>опубликовано </span>
          {props.postedTimeAgo}
        </span>
      </div>
      <h2 className={styles.title}>
        <Link
          to={'/posts/' + props.cardId}
          className={styles.postLink}
          onClick={props.handleOpenCommentModal}
        >
          {props.title}
        </Link>
      </h2>
    </div>
  )
}
