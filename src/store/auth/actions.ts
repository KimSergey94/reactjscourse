import axios from 'axios'
import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store'

export const AUTH_REQUEST = 'AUTH_REQUEST'
export type AuthRequestAction = {
  type: typeof AUTH_REQUEST
}
export const authRequest: ActionCreator<AuthRequestAction> = () => ({
  type: AUTH_REQUEST,
})

export interface IUserData {
  name?: string
  iconImg?: string
}
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS'
export type AuthRequestSuccessAction = {
  type: typeof AUTH_REQUEST_SUCCESS
  data: IUserData
}
export const authRequestSuccess: ActionCreator<AuthRequestSuccessAction> = (
  data: IUserData
) => ({
  type: AUTH_REQUEST_SUCCESS,
  data: data,
})

export const AUTH_REQUEST_FAILURE = 'AUTH_REQUEST_FAILURE'
export type AuthRequestFailureAction = {
  type: typeof AUTH_REQUEST_FAILURE
  error: string
}
export const authRequestFailure: ActionCreator<AuthRequestFailureAction> = (
  error: string
) => ({
  type: AUTH_REQUEST_FAILURE,
  error: error,
})

export const authRequestAsync =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    dispatch(authRequest())

    axios
      .get('https://oauth.reddit.com/api/v1/me', {
        headers: { Authorization: `bearer ${getState().token}` },
      })
      .then((resp) => {
        const userData = resp.data
        // const myUserData = {name: userData.name, iconImg: userData.icon_img};
        // setData(myUserData);
        dispatch(
          authRequestSuccess({
            name: userData.name,
            iconImg: userData.icon_img,
          })
        )
      })
      .catch((err) => {
        console.log(err)
        dispatch(authRequestFailure(String(err)))
      })
  }
