import { Reducer } from 'react'
import {
  AuthRequestAction,
  AuthRequestFailureAction,
  AuthRequestSuccessAction,
  AUTH_REQUEST,
  AUTH_REQUEST_FAILURE,
  AUTH_REQUEST_SUCCESS,
  IUserData,
} from './actions'

export type AuthState = {
  loading: boolean
  error: string
  data: IUserData
}

export type AuthActions =
  | AuthRequestAction
  | AuthRequestSuccessAction
  | AuthRequestFailureAction

export const authReducer: Reducer<AuthState, AuthActions> = (state, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case AUTH_REQUEST_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    default:
      return state
  }
}
