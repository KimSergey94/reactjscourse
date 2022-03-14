import React, { useEffect } from 'react';
import {  TDisplayType } from '../../../context/displayTypeContext';
import { Dropdown } from '../../../Dropdown';
import { EIconName, Icon } from '../../../Icons/Icon';
import styles from './menu.less';

export interface IMenuProps{
    cardId: number;
    isOpen?: boolean;
}

export function Menu (props: IMenuProps) {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(props.isOpen);
    React.useEffect(()=> setIsDropdownOpen(props.isOpen), [props.isOpen]);
    React.useEffect(()=> isDropdownOpen ? props.onOpen(): props.onClose(), [isDropdownOpen]);
    const handleOpen = ()=> {
      if(props.isOpen === undefined) {
        setIsDropdownOpen(!isDropdownOpen)
      }
    }
    
    return (
        <div className={styles.menu}>
            <div className={styles.container}>
                <div>
                    <button className={styles.menuButton}><Icon size={20} name={EIconName.MenuIcon}/></button>
                </div>       
                <Dropdown cardId={props.cardId}/>
            </div>
        </div>
    );
}