import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout } from './shared/Layout/Layout';
import './main.global.less';
import { Header } from './shared/Header/Header';
import { Content } from './shared/Content/Content';
import { CardsList } from './shared/CardsList/CardsList';
import {assignId} from './utils/react/generateRandomIndex';
import { postsContext } from './shared/context/postsContext';
import { UserContextProvider } from './shared/context/userContext';
import { usePostsData } from './hooks/usePostsData';
import { displayTypeContext, TDisplayType } from './shared/context/displayTypeContext';
import { useDisplayType } from './hooks/useDisplayType';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './store';

export const store = createStore(rootReducer, composeWithDevTools());
const LIST = [
    {As: 'li' as const, text: 'some'},
    {As: 'li' as const, text: 'some2'},
    {As: 'li' as const, text: 'some3'},
    {As: 'li' as const, text: 'some4'},
].map(assignId)


function AppComponent() {
    const [posts] = usePostsData();
    const [displayType] = useDisplayType();

    return(
    <Provider store={store}>
        <UserContextProvider>
            <displayTypeContext.Provider value={{displayType: displayType as TDisplayType}}>
                <Layout>
                    <Header/>
                    <Content>
                        <postsContext.Provider value={posts}>
                            <CardsList/>
                        </postsContext.Provider>
                    </Content>
                </Layout>
            </displayTypeContext.Provider>
        </UserContextProvider>
    </Provider>
    );
}

export const App = hot(() => <AppComponent/>);