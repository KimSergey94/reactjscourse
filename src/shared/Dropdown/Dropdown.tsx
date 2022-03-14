/**
 * @jest-environment jsdom
 */

import React, { useContext } from 'react';
import { MenuItemsList } from '../CardsList/Card/Menu/MenuItemsList';
import { displayTypeContext } from '../context/displayTypeContext';
import { EIconName, Icon } from '../Icons/Icon';
import styles from './dropdown.less';
import {EColors, Text} from '../Text/Text';
import ReactDOM from 'react-dom';

interface IDropdownProps {
    isOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    cardId: number;
}

export function Dropdown({ cardId }: IDropdownProps) {
    const displayType = useContext(displayTypeContext);
    // React.useEffect(()=> setIsDropdownOpen(isOpen), [isOpen])
    // React.useEffect(()=> isDropdownOpen ? onOpen() : onClose(), [isDropdownOpen])

    const node = document.querySelector(`#dropdown${cardId}`);
    if(!node) return null;

    return ReactDOM.createPortal(
            <div className={styles.listContainer}>
                <div className={styles.list}>
                <div className={styles.dropdown}>
                    <MenuItemsList cardId={cardId} displayType={displayType.displayType} />
                    <button className={styles.closeButton}>
                        <Text mobileSize={12} size={14} color={EColors.grey66}>
                            Закрыть
                        </Text>
                    </button>
                </div>
                </div>
            </div>
      , node
    );
}