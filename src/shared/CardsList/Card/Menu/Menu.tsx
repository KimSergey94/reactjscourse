import React from 'react';
import { Dropdown } from '../../../Dropdown';
import { MenuIcon } from '../../../Icons/MenuIcon';
import { EColors, Text } from '../../../Text/Text';
import styles from './menu.less';
import { MenuItemsList } from './MenuItemsList';

export function Menu () {
    return (
        <div className={styles.menu}>
            <Dropdown
                onClose={() => console.log('closed')} 
                onOpen={() => console.log('opened')} 
                isOpen={false}
                button={<button className={styles.menuButton}>
                            <MenuIcon/>
                        </button>}>
            <div className={styles.dropdown}>
                <MenuItemsList postId={'123'} />
                <button className={styles.closeButton}>
                    <Text mobileSize={12} size={14} color={EColors.grey66}>
                        Закрыть
                    </Text>
                </button>
            </div>
            </Dropdown>
        </div>


    );
}