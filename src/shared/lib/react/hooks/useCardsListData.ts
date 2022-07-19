import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCardsListDataAsync,
  setLoadMoreTrigger,
} from '../store/postsCards/actions'
import { CardsListState } from '../store/postsCards/reducer'
import { RootState } from '../store/store'

export function useCardsListData() {
  const [intersectionCounter, setIntersectionCounter] = useState(-1)
  const [showLoadBtn, setShowLoadBtn] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector<RootState, string>((state) => state.token)
  const data = useSelector<RootState, CardsListState>(
    (state) => state.cardsListData
  )
  const bottomOfList = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          data.data.nextAfter !== null &&
          !data.loadMoreTrigger
        ) {
          setIntersectionCounter(intersectionCounter + 1)
          if (intersectionCounter > 2 && intersectionCounter % 3 === 0) {
            setShowLoadBtn(true)
          } else {
            dispatch(setCardsListDataAsync())
            setShowLoadBtn(false)
          }
        }
      },
      {
        rootMargin: '10px',
      }
    )

    if (bottomOfList.current) {
      observer.observe(bottomOfList.current)
    }

    if (data.loadMoreTrigger) {
      dispatch(setCardsListDataAsync())
      dispatch(setLoadMoreTrigger(false))
    }

    return () => {
      if (bottomOfList.current) {
        observer.unobserve(bottomOfList.current)
      }
    }
  }, [bottomOfList.current, data.data.nextAfter, token, data.loadMoreTrigger])

  return {
    data,
    showLoadBtn,
    bottomOfList,
  }
}
