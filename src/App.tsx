import React, {useEffect, useState}  from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout } from './shared/Layout/Layout';
import './main.global.less';
import { Header } from './shared/Header/Header';
import { Content } from './shared/Content/Content';
import { CardsList } from './shared/CardsList/CardsList';
import { getValue } from './utils/react/pickFromSyntheticEvent';
import { MyHooks, useIsMounted } from './HooksExamples';
import { GenericList } from './shared/GenericList/GenericList';
import {assignId, generateId, generateRandomString} from './utils/react/generateRandomIndex';
import { merge } from './utils/js/merge';
import { Dropdown } from './shared/Dropdown';
import { EColors, Text } from './shared/Text';
import { Break } from './shared/Break/Break';
import { useToken } from './hooks/useToken';

const LIST = [
    {As: 'li' as const, text: 'some'},
    {As: 'li' as const, text: 'some2'},
    {As: 'li' as const, text: 'some3'},
    {As: 'li' as const, text: 'some4'},
].map(assignId)


function AppComponent() {
    //const [isVisible, setIsVisible] = React.useState(true);
    
    //  const [title, setTitle] = React.useState('');
    //  const [isVisible] = useIsMounted();

    //const url = new URL(window.location.href);
    const [token] = useToken();
    //console.log(url.searchParams.get('code'));

    const [list, setList] = React.useState(LIST);
    const handleItemClick = (id: string) => {
        setList(list.filter((item) => item.id !== id));
    }
    const handleAdd = () => {
        setList(list.concat((generateId({text:generateRandomString(), As: 'li' as const}))));
    }
    return(
        <Layout>
            <Header token={token}/>
            <Content>
                <CardsList/>
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
                        isOpen={false}
                        button={<button>Test</button>}>
                        <CardsList/>
                    </Dropdown>
                </div>

                    {/* <button onClick={handleAdd}>Add Element</button> 

                    <GenericList list={list.map(merge({onClick: () => {console.log('click')}}))} />

                    {/* <button onClick={() => setIsVisible(!isVisible)}>Change Me!</button>  */}
                {/* <input type="text" onChange={getValue(setTitle)} />
                {isVisible && <MyHooks title={title} id="11" />} */} 
            </Content>
        </Layout>
    );
}

export const App = hot(() => <AppComponent/>);