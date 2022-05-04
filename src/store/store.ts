import { ActionCreator, AnyAction, Reducer } from "redux";
import { MeRequestAction, MeRequestFailureAction, MeRequestSuccessAction, ME_REQUEST, ME_REQUEST_FAILURE, ME_REQUEST_SUCCESS } from "./me/actions";
import { meReducer, MeState } from "./me/reducer";

export type RootState = {
    commentText: string;
    token: string;
    me: MeState
}
const initialState:RootState = {
    commentText: 'Привет, Skillbox!',
    token: '',
    me: {
        loading: false,
        error: '',
        data: {},
    }
}

const UPDATE_COMMENT = 'UPDATE_COMMENT';
type UpdateCommentAction = {
    type: typeof UPDATE_COMMENT;
    text: string;
}
export const updateComment: ActionCreator<UpdateCommentAction> = (text) => ({
    type: UPDATE_COMMENT, 
    text,
});
const SET_TOKEN = 'SET_TOKEN';
type SetTokenAction = {
    type: typeof SET_TOKEN;
    token: string;
}
export const setToken: ActionCreator<SetTokenAction> = (token:string) => ({
    type: SET_TOKEN, 
    token,
});

type MyAction = UpdateCommentAction | SetTokenAction | MeRequestAction | MeRequestSuccessAction | MeRequestFailureAction;


export const rootReducer: Reducer<RootState> = (state = initialState, action) => {
    console.log('rootReducer action',action);
    switch(action.type){
        case UPDATE_COMMENT:
            return {
                ...state,
                commentText: action.text,
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.text,
            };
        case ME_REQUEST:
        case ME_REQUEST_SUCCESS:
        case ME_REQUEST_FAILURE:
            return {
                ...state,
                me: meReducer(state.me, action)
            }

        default: return state;
    }
}

