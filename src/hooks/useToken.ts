import { useEffect, useState } from "react";
import React  from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState, setToken } from "../store/store";

export function useToken(){
    // const [token, setToken] = useState('');
    
    const dispatch = useDispatch();
    const token = useSelector<RootState, string>(state => state.token);
    //const token = "";
    useEffect(() => {
        if(window.__token__ && !token){
            // setToken(window.__token__);
            console.log('useToken no token');
            dispatch(setToken(window.__token__));
        }
    }, [])
    console.log('token',token);
    return [token];
}