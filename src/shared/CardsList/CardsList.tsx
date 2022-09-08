import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useCardsListData } from '../lib/react/hooks/useCardsListData'
import { setLoadMoreTrigger } from '../lib/react/store/postsCards/actions'
import { Card } from './Card/Card'
import styles from './cardslist.less'

export function CardsList() {
  const { data, showLoadBtn, bottomOfList } = useCardsListData()
  const dispatch = useDispatch()

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
              onClick={() => dispatch(setLoadMoreTrigger(true))}
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
