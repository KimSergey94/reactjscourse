import React, {useState}  from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout } from './shared/Layout/Layout';
import './main.global.less';
import { Header } from './shared/Header/Header';
import { Content } from './shared/Content/Content';
import { CardsList } from './shared/CardsList/CardsList';
import { getValue } from './utils/react/pickFromSyntheticEvent';
import { MyHooks, useIsMounted } from './HooksExamples';

function AppComponent() {
    //const [isVisible, setIsVisible] = React.useState(true);
    const [title, setTitle] = React.useState('');
    const [isVisible] = useIsMounted();

    return(
        <Layout>
            <Header/>
            <Content>
                <CardsList/>

                {/* <button onClick={() => setIsVisible(!isVisible)}>Change Me!</button> */}
                <input type="text" onChange={getValue(setTitle)} />
                {isVisible && <MyHooks title={title} id="11" />}
            </Content>
        </Layout>
    );
}

export const App = hot(AppComponent);