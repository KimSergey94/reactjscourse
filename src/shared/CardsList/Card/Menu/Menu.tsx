import React, { useEffect } from 'react';
import {  TDisplayType } from '../../../context/displayTypeContext';
import { Dropdown } from '../../../Dropdown';
import { EIconName, Icon } from '../../../Icons/Icon';
import styles from './menu.less';

export interface IMenuProps{
    displayType: TDisplayType;
    cardId: number;
    cards?: ICardMenuOpened;
}
export interface ICardMenuOpened{
    cards: IIsCardMenuOpened[];
}
interface IIsCardMenuOpened{
    cardId: number;
    isOpened: boolean;
}

export function Menu (props: IMenuProps) {
    function toggleCardDropdown(cardId:number){
        const temp = Object.assign({}, cardMenuOpened);
        //if(!cardMenuOpened.cards[cardId]) temp.cards[cardId] = {cardId: cardId, isOpened: true}
        //else if(cardMenuOpened.cards[cardId]) temp.cards[cardId].isOpened = !temp.cards[cardId].isOpened;
        if(temp.cards){
            temp.cards.map((x)=>{
                if(x.cardId === props.cardId) { console.log('props.cardId',props.cardId, x.isOpened);x.isOpened = !x.isOpened;}
                else x.isOpened = false;
            })
        }
            
        setCardMenuOpened(temp);
        console.log(111, cardMenuOpened);
    }
    function isCardMenuOpened(cardId:number){
        console.log(222, cardMenuOpened);
        if(cardMenuOpened?.cards[cardId]?.isOpened) return true;
        return false;
    }
    const [cardMenuOpened, setCardMenuOpened] = React.useState<ICardMenuOpened>({cards:props.cards?.cards??[]});
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