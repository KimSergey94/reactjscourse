import React, { Fragment, useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout } from './shared/Layout/Layout';
import './main.global.less';
import { Header } from './shared/Header/Header';
import { Content } from './shared/Content/Content';
import { CardsList } from './shared/CardsList/CardsList';
import {assignId, generateRandomString} from './utils/react/generateRandomIndex';
import { postsContext } from './shared/context/postsContext';
import { UserContextProvider } from './shared/context/userContext';
import { usePostsData } from './hooks/usePostsData';
import { displayTypeContext, TDisplayType } from './shared/context/displayTypeContext';
import { useDisplayType } from './hooks/useDisplayType';
import { Provider } from 'react-redux';
import { Action, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction } from 'redux-thunk';
import { rootReducer, RootState } from './store/store';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { Post } from './shared/Post';


export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
));

const timeout = (ms:number): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch, _getState) => {
    dispatch({type: 'START'});
    setTimeout(()=> {
        dispatch({type: 'FINISH'});
    }, ms)
}

function AppComponent() {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        //@ts-ignore
        store.dispatch(timeout(1500));
    }, []);

    // const [posts] = usePostsData();
    const [displayType] = useDisplayType();

    return(
    <Provider store={store}>
        {mounted && (
            <BrowserRouter>
                <UserContextProvider>
                    <displayTypeContext.Provider value={{displayType: displayType as TDisplayType}}>
                      
                        <Layout>
                            <Header/>
                            <Content>
                                    <CardsList/>

                                    <Routes>
                                        <Route path="/posts/:id" element={<Post title={''} author={''} cardId={''} onClose={()=>{}}/>} />
                                    </Routes>
                            </Content>
                        </Layout>
                    </displayTypeContext.Provider>
                </UserContextProvider>
            </BrowserRouter>
        )}
    </Provider>
    );
}

export const App = hot(() => <AppComponent/>);