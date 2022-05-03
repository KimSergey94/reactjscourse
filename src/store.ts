import { ActionCreator, AnyAction, Reducer } from "redux";

export type RootState = {
    commentText: string;
    token: string;
}
const initialState = {
    commentText: 'Привет, Skillbox!',
    token: '',
}

const UPDATE_COMMENT = 'UPDATE_COMMENT';
const SET_TOKEN = 'SET_TOKEN';
export const updateComment: ActionCreator<AnyAction> = (text) => ({
    type: UPDATE_COMMENT, 
    text,
});
export const setToken: ActionCreator<AnyAction> = (text) => ({
    type: SET_TOKEN, 
    text,
});
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
                token: action.token,
            };
        default: return state;
    }
}

