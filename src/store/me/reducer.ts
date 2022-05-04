import { Reducer } from "react";
import { MeRequestAction, MeRequestSuccessAction, MeRequestFailureAction, ME_REQUEST, ME_REQUEST_FAILURE, ME_REQUEST_SUCCESS, IUserData } from "./actions";

export type MeState = {
    loading: boolean;
    error: string;
    data: IUserData
}

type MeActions = MeRequestAction | MeRequestSuccessAction | MeRequestFailureAction;

export const meReducer: Reducer<MeState, MeActions> = (state, action) => {
    switch(action.type) {
        case ME_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ME_REQUEST_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case ME_REQUEST_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        default: return state;
    }
}