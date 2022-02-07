import React from 'react';
import { Dropdown } from '../../../Dropdown';
import { EIconName, Icon } from '../../../Icons/Icon';
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
                            <Icon size={20} name={EIconName.MenuIcon}/>
                        </button>}>
            <div className={styles.dropdown}>
                
                <MenuItemsList postId={'123'} displayType={'desktop'} />
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