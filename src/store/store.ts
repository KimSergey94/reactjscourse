import { ActionCreator, AnyAction, Reducer } from "redux";
import { ICardProps } from "../shared/CardsList/Card";
import { MeRequestAction, MeRequestFailureAction, MeRequestSuccessAction, ME_REQUEST, ME_REQUEST_FAILURE, ME_REQUEST_SUCCESS } from "./me/actions";
import { meReducer, MeState } from "./me/reducer";

export type RootState = {
    commentText: string;
    token: string;
    me: MeState;
    cardProps: ICardProps[];
}
const initialState:RootState = {
    commentText: 'Привет, Skillbox!',
    token: '',
    me: {
        loading: false,
        error: '',
        data: {},
    },
    cardProps: []
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
const UPDATE_CARD_PROPS = 'UPDATE_CARD_PROPS';
type UpdateCardPropsAction = {
    type: typeof UPDATE_CARD_PROPS;
    cardProps: ICardProps[];
}
export const updateCardProps: ActionCreator<UpdateCardPropsAction> = (cardProps) => ({
    type: UPDATE_CARD_PROPS, 
    cardProps
});
type MyAction = UpdateCommentAction | SetTokenAction | MeRequestAction | MeRequestSuccessAction | MeRequestFailureAction | UpdateCardPropsAction;


export const rootReducer: Reducer<RootState, MyAction> = (state = initialState, action) => {
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
                token: action.token,
            };
        case ME_REQUEST:
        case ME_REQUEST_SUCCESS:
        case ME_REQUEST_FAILURE:
            return {
                ...state,
                me: meReducer(state.me, action)
            };
        case UPDATE_CARD_PROPS:
            return {
                ...state,
                cardProps: action.cardProps,
            };
        default: return state;
    }
}

