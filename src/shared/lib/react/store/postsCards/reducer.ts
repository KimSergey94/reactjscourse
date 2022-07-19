import { Reducer } from 'react'
import {
  SetCardsListDataAction,
  SetCardsListDataFailureAction,
  SetCardsListDataSuccessAction,
  SET_CARDS_LIST_DATA,
  SET_CARDS_LIST_DATA_FAILURE,
  SET_CARDS_LIST_DATA_SUCCESS,
  ICardsListData,
  SET_LOAD_MORE_TRIGGER,
  SetLoadMoreTriggerAction,
} from './actions'

export type CardsListState = {
  loading: boolean
  error: string
  data: ICardsListData
  loadMoreTrigger: boolean
}

export type CardsListActions =
  | SetCardsListDataAction
  | SetCardsListDataSuccessAction
  | SetCardsListDataFailureAction
  | SetLoadMoreTriggerAction

export const cardsListReducer: Reducer<CardsListState, CardsListActions> = (
  state,
  action
) => {
  switch (action.type) {
    case SET_CARDS_LIST_DATA:
      return {
        ...state,
        loading: true,
      }
    case SET_CARDS_LIST_DATA_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case SET_CARDS_LIST_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    case SET_LOAD_MORE_TRIGGER:
      return {
        ...state,
        loadMoreTrigger: action.loadMoreTrigger,
      }
    default:
      return state
  }
}
