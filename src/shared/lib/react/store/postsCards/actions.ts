import axios from 'axios'
import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { ICardProps } from '../../../../CardsList/Card/Card'
import {
  IRedditRisingResponseData,
  mergeCardPropsArrays,
} from '../../../js/CardsListHelper'
import { RootState } from '../store'

export const SET_CARDS_LIST_DATA = 'SET_CARDS_LIST_DATA'
export type SetCardsListDataAction = {
  type: typeof SET_CARDS_LIST_DATA
}
export const setCardsListData: ActionCreator<SetCardsListDataAction> = () => ({
  type: SET_CARDS_LIST_DATA,
})

export interface ICardsListData {
  nextAfter?: string
  cardsList: ICardProps[]
}
export const SET_CARDS_LIST_DATA_SUCCESS = 'SET_CARDS_LIST_DATA_SUCCESS'
export type SetCardsListDataSuccessAction = {
  type: typeof SET_CARDS_LIST_DATA_SUCCESS
  data: ICardsListData
}
export const setCardsListDataSuccess: ActionCreator<
  SetCardsListDataSuccessAction
> = (data: ICardsListData) => ({
  type: SET_CARDS_LIST_DATA_SUCCESS,
  data: data,
})

export const SET_CARDS_LIST_DATA_FAILURE = 'SET_CARDS_LIST_DATA_FAILURE'
export type SetCardsListDataFailureAction = {
  type: typeof SET_CARDS_LIST_DATA_FAILURE
  error: string
}
export const setCardsListDataFailure: ActionCreator<
  SetCardsListDataFailureAction
> = (error: string) => ({
  type: SET_CARDS_LIST_DATA_FAILURE,
  error: error,
})

export const setCardsListDataAsync =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    dispatch(setCardsListData())

    async function load() {
      try {
        const risingResponse: IRedditRisingResponseData = await axios.get(
          'https://oauth.reddit.com/rising/',
          {
            headers: { Authorization: `bearer ${getState().token}` },
            params: {
              limit: 5,
              after: getState().cardsListData.data.nextAfter,
            },
          }
        )

        if (
          risingResponse.data.data.after ===
          getState().cardsListData.data.nextAfter
        )
          return

        const cardPropsTemp: ICardProps[] =
          risingResponse.data.data.children?.map((redditT3ResponseData) => {
            return {
              content: {
                displayName:
                  redditT3ResponseData.data.author ||
                  redditT3ResponseData.data.name,
                postedTimeAgo: redditT3ResponseData.data.created,
                title: redditT3ResponseData.data.title,
                imgLink: redditT3ResponseData.data.thumbnail,
                cardId: redditT3ResponseData.data.id,
                handleOpenCommentModal: () => {},
              },
              preview: {
                imgSrc: redditT3ResponseData.data.thumbnail,
              },
              controls: {
                karmaValue: redditT3ResponseData.data.ups,
                commentsNumber: redditT3ResponseData.data.score,
              },
              cardId: redditT3ResponseData.data.id,
            }
          })

        dispatch(
          setCardsListDataSuccess({
            nextAfter: risingResponse.data.data.after,
            cardsList: mergeCardPropsArrays(
              getState().cardsListData.data.cardsList,
              cardPropsTemp
            ),
          })
        )
      } catch (err) {
        console.error(err)
        dispatch(setCardsListDataFailure(String('Не удалось загрузить посты.')))
      }
    }
    load()
  }

export const SET_LOAD_MORE_TRIGGER = 'SET_LOAD_MORE_TRIGGER'
export type SetLoadMoreTriggerAction = {
  type: typeof SET_LOAD_MORE_TRIGGER
  loadMoreTrigger: boolean
}
export const setLoadMoreTrigger: ActionCreator<SetLoadMoreTriggerAction> = (
  loadMoreTrigger: boolean
) => ({
  type: SET_LOAD_MORE_TRIGGER,
  loadMoreTrigger: loadMoreTrigger,
})
