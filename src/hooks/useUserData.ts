import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tokenContext } from "../shared/context/tokenContext";
import { RootState, setToken } from "../store";

interface IUserData{
    name?: string;
    iconImg?: string;
}
export function useUserData() {
    const [data, setData] = useState<IUserData>();
    //const token = useContext(tokenContext);
    const token = useSelector<RootState, string>(state => state.token);
    const dispatch = useDispatch();
    console.log('1 token', token);

    useEffect(() => {
        if(window.__token__ && !token){
            console.log('no token window.__token__',window.__token__);
            dispatch(setToken(window.__token__));
        }
        console.log('2 token', token);
        
        axios.get('https://oauth.reddit.com/api/v1/me', {
            headers: {Authorization: `bearer ${token}`}
        })
            .then((resp) => {
                const userData = resp.data;
                setData({name: userData.name, iconImg: userData.icon_img});
            })
            .catch(console.log);
    }, [token])

    return [data]
}