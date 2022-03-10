import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout } from './shared/Layout/Layout';
import './main.global.less';
import { Header } from './shared/Header/Header';
import { Content } from './shared/Content/Content';
import { CardsList } from './shared/CardsList/CardsList';
import {assignId} from './utils/react/generateRandomIndex';
import { Dropdown } from './shared/Dropdown';
import { EColors, Text } from './shared/Text';
import { Break } from './shared/Break/Break';
import { useToken } from './hooks/useToken';
import { tokenContext } from './shared/context/tokenContext';
import { postsContext } from './shared/context/postsContext';
import { UserContextProvider } from './shared/context/userContext';
import { usePostsData } from './hooks/usePostsData';
import { commentContext } from './shared/context/commentContext';


const LIST = [
    {As: 'li' as const, text: 'some'},
    {As: 'li' as const, text: 'some2'},
    {As: 'li' as const, text: 'some3'},
    {As: 'li' as const, text: 'some4'},
].map(assignId)


function AppComponent() {
    const [commentValue, setCommentValue] = useState('');
    const CommentProvider = commentContext.Provider;
    const [token] = useToken();
    const [posts] = usePostsData();
    return(
        <CommentProvider value={{value: commentValue, onChange: setCommentValue}}>
            <tokenContext.Provider value={token}>
                <UserContextProvider>
                    <Layout>
                        <Header/>
                        <Content>
                            <postsContext.Provider value={posts}>
                                <CardsList/>
                            </postsContext.Provider>
                        </Content>
                    </Layout>
                </UserContextProvider>
            </tokenContext.Provider>
        </CommentProvider>
    );
}

export const App = hot(() => <AppComponent/>);