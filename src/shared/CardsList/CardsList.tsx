import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { cardsListContext } from '../lib/react/context/cardsListContext'
import { setLoadMoreTrigger } from '../lib/react/store/postsCards/actions'
import { Card } from './Card/Card'
import styles from './cardslist.less'

export interface IRedditRisingResponseData {
  data: IRedditListingResponseData
}
export interface IRedditListingResponseData {
  data: {
    after: string
    before: string
    children: IRedditT3ResponseData[]
    geo_filter: string
  }
  kind: string
}
export interface IRedditT3ResponseData {
  data: IRedditData
  kind: string
}
export interface IRedditData {
  author: string
  body: string
  body_html: string
  created: string
  created_utc: string
  id: string
  permalink: string
  subreddit: string
  name: string
  title: string
  thumbnail: string
  ups: number
  score: number
  replies: IRedditListingResponseData
}

export function CardsList() {
  const { data, showLoadBtn, bottomOfList } = useContext(cardsListContext)

  return (
    <>
      <ul className={styles.cardsList}>
        {data?.data.cardsList?.length === 0 && !data.loading && !data.error && (
          <div style={{ textAlign: 'center' }}>Нет ни одного поста</div>
        )}

        {data?.data.cardsList?.map((x) => (
          <Card
            key={x.cardId}
            content={x.content}
            preview={x.preview}
            controls={x.controls}
            cardId={x.cardId}
          />
        ))}

        <div ref={bottomOfList} />
        {data?.loading && (
          <div style={{ textAlign: 'center' }}>Загрузка...</div>
        )}
        {showLoadBtn && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              style={{ textAlign: 'center' }}
              onClick={() => setLoadMoreTrigger(true)}
            >
              Загрузить еще
            </button>
          </div>
        )}

        {data?.error && (
          <div role="alert" style={{ textAlign: 'center' }}>
            {data.error}
          </div>
        )}
      </ul>
      <Outlet />
    </>
  )
}
