import { ActionCreator, Reducer } from 'redux'
import {
  AUTH_REQUEST,
  AUTH_REQUEST_FAILURE,
  AUTH_REQUEST_SUCCESS,
} from './auth/actions'
import { AuthActions, authReducer, AuthState } from './auth/reducer'
import {
  SET_CARDS_LIST_DATA,
  SET_CARDS_LIST_DATA_FAILURE,
  SET_CARDS_LIST_DATA_SUCCESS,
  SET_LOAD_MORE_TRIGGER,
} from './postsCards/actions'
import {
  CardsListActions,
  cardsListReducer,
  CardsListState,
} from './postsCards/reducer'

export type RootState = {
  token: string
  auth: AuthState
  cardsListData: CardsListState
}
const initialState: RootState = {
  token: '',
  auth: {
    loading: false,
    error: '',
    data: {},
  },
  cardsListData: {
    loading: false,
    error: '',
    data: {
      cardsList: [],
    },
    loadMoreTrigger: false,
  },
}

const SET_TOKEN = 'SET_TOKEN'
type SetTokenAction = {
  type: typeof SET_TOKEN
  token: string
}
export const setToken: ActionCreator<SetTokenAction> = (token: string) => ({
  type: SET_TOKEN,
  token,
})

type MyAction = SetTokenAction | AuthActions | CardsListActions

export const rootReducer: Reducer<RootState, MyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      }
    case AUTH_REQUEST:
    case AUTH_REQUEST_SUCCESS:
    case AUTH_REQUEST_FAILURE:
      return {
        ...state,
        auth: authReducer(state.auth, action),
      }
    case SET_CARDS_LIST_DATA:
    case SET_CARDS_LIST_DATA_SUCCESS:
    case SET_CARDS_LIST_DATA_FAILURE:
    case SET_LOAD_MORE_TRIGGER:
      return {
        ...state,
        cardsListData: cardsListReducer(state.cardsListData, action),
      }
    default:
      return state
  }
}
