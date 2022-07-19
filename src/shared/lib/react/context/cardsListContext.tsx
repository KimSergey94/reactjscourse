import React from 'react'
import { useCardsListData } from '../hooks/useCardsListData'
import { CardsListState } from '../store/postsCards/reducer'

interface ICardsListContext {
  data?: CardsListState
  showLoadBtn?: boolean
  bottomOfList?: React.RefObject<HTMLDivElement>
}
export const cardsListContext = React.createContext<ICardsListContext>({})

export function CardsListContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data, showLoadBtn, bottomOfList } = useCardsListData()
  return (
    <cardsListContext.Provider
      value={{ data, showLoadBtn, bottomOfList } ?? {}}
    >
      {children}
    </cardsListContext.Provider>
  )
}
