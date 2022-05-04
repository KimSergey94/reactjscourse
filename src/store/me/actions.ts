import axios from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

export const ME_REQUEST = 'ME_REQUEST';
export type MeRequestAction = {
    type: typeof ME_REQUEST;
}
export const meRequest: ActionCreator<MeRequestAction> = () => ({
    type: ME_REQUEST,
});

export interface IUserData{
    name?: string;
    iconImg?: string;
}
export const ME_REQUEST_SUCCESS = 'ME_REQUEST_SUCCESS';
export type MeRequestSuccessAction = {
    type: typeof ME_REQUEST_SUCCESS;
    data: IUserData;
}
export const meRequestSuccess: ActionCreator<MeRequestSuccessAction> = (data: IUserData) => ({
    type: ME_REQUEST_SUCCESS,
    data: data
});

export const ME_REQUEST_FAILURE = 'ME_REQUEST_FAILURE';
export type MeRequestFailureAction = {
    type: typeof ME_REQUEST_FAILURE;
    error: string;
}
export const meRequestFailure: ActionCreator<MeRequestFailureAction> = (error: string) => ({
    type: ME_REQUEST_FAILURE,
    error: error
});

export const meRequestAsync = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch, getState) => {
    dispatch(meRequest());
        
    axios.get('https://oauth.reddit.com/api/v1/me', {
        headers: {Authorization: `bearer ${getState().token}`}
    })
        .then((resp) => {
            const userData = resp.data;
            // const myUserData = {name: userData.name, iconImg: userData.icon_img};
            // setData(myUserData);
            dispatch(meRequestSuccess({name: userData.name, iconImg: userData.icon_img}));
        })
        .catch((err)=>{
            console.log(err);
            dispatch(meRequestFailure(String(err)));
        });
}