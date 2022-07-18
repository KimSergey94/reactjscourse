import { ActionCreator, Reducer } from 'redux'
import { ICardProps } from '../../../UI/CardsList/Card/Card'
import {
  AuthRequestAction,
  AuthRequestFailureAction,
  AuthRequestSuccessAction,
  AUTH_REQUEST,
  AUTH_REQUEST_FAILURE,
  AUTH_REQUEST_SUCCESS,
} from './auth/actions'
import { meReducer, MeState } from './auth/reducer'

export type RootState = {
  commentText: string
  token: string
  me: MeState
  cardProps: ICardProps[]
}
const initialState: RootState = {
  commentText: 'Привет, Skillbox!',
  token: '',
  me: {
    loading: false,
    error: '',
    data: {},
  },
  cardProps: [],
}

const UPDATE_COMMENT = 'UPDATE_COMMENT'
type UpdateCommentAction = {
  type: typeof UPDATE_COMMENT
  text: string
}
export const updateComment: ActionCreator<UpdateCommentAction> = (text) => ({
  type: UPDATE_COMMENT,
  text,
})
const SET_TOKEN = 'SET_TOKEN'
type SetTokenAction = {
  type: typeof SET_TOKEN
  token: string
}
export const setToken: ActionCreator<SetTokenAction> = (token: string) => ({
  type: SET_TOKEN,
  token,
})

type MyAction =
  | UpdateCommentAction
  | SetTokenAction
  | AuthRequestAction
  | AuthRequestSuccessAction
  | AuthRequestFailureAction

export const rootReducer: Reducer<RootState, MyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {
        ...state,
        commentText: action.text,
      }
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
        me: meReducer(state.me, action),
      }
    default:
      return state
  }
}
