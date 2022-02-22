import React from 'react';
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

const LIST = [
    {As: 'li' as const, text: 'some'},
    {As: 'li' as const, text: 'some2'},
    {As: 'li' as const, text: 'some3'},
    {As: 'li' as const, text: 'some4'},
].map(assignId)


function AppComponent() {
    const [token] = useToken();
    const [posts] = usePostsData();
    return(
        <tokenContext.Provider value={token}>
            <UserContextProvider>
                <Layout>
                    <Header/>
                    <Content>
                        <postsContext.Provider value={posts}>
                            <CardsList/>
                        </postsContext.Provider>

                        <br/>
                        <Text size={20} mobileSize={28} color={EColors.green} bold>Label 1</Text>
                        <Break size={8} top/>
                        <Text size={20}>Label 2</Text>
                        <Break size={8} top/>
                        <Text size={20} mobileSize={16}>Label 3</Text>

                        <div style={{padding: 20}}>
                            <br/>
                            <Dropdown
                                onClose={() => console.log('closed')} 
                                onOpen={() => console.log('opened')} 
                                isOpen={true}
                                button={<button>Test</button>}>
                                <CardsList/>
                            </Dropdown>
                        </div>
                    </Content>
                </Layout>
            </UserContextProvider>
        </tokenContext.Provider>
    );
}

export const App = hot(() => <AppComponent/>);