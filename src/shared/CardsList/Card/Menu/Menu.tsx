import React from 'react';
import {  TDisplayType } from '../../../context/displayTypeContext';
import { Dropdown } from '../../../Dropdown';
import { EIconName, Icon } from '../../../Icons/Icon';
import styles from './menu.less';

export interface IMenuProps{
    displayType: TDisplayType;
    cardId: number;
}
interface ICardMenuOpened{
    cards: IIsCardMenuOpened[];
}
interface IIsCardMenuOpened{
    cardId: number;
    isOpened: boolean;
}

export function Menu (props: IMenuProps) {
    function toggleCardDropdown(cardId:number){
        if(!cardMenuOpened.cards[cardId]) cardMenuOpened.cards[cardId] = {cardId: cardId, isOpened: true}
        else if(cardMenuOpened.cards[cardId].isOpened) cardMenuOpened.cards[cardId].isOpened = !cardMenuOpened.cards[cardId].isOpened;
        setCardMenuOpened(cardMenuOpened);
    }
    function isCardMenuOpened(cardId:number){
        if(cardMenuOpened?.cards[cardId]?.isOpened) return true;
        return false;
    }
    const [cardMenuOpened, setCardMenuOpened] = React.useState<ICardMenuOpened>({cards:[]});

    return (
        <div className={styles.menu} id={`menu${props.cardId}`}>
            <div className={styles.container}>
                <div onClick={()=>toggleCardDropdown(props.cardId)}>
                    <button className={styles.menuButton}><Icon size={20} name={EIconName.MenuIcon}/></button>
                </div>       
                <div id={`dropdown${props.cardId}`}>
                    {isCardMenuOpened(props.cardId) && (<Dropdown cardId={props.cardId}/>)}
                </div>
            </div>
        </div>
    );
}