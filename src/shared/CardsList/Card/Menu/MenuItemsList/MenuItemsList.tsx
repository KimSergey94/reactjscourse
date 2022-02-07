import React from 'react';
import { CommentIcon } from '../../../../Icons/CommentIcon';
import { WarningIcon } from '../../../../Icons/WarningIcon';
import styles from './menuitemslist.less';
import {EColors, Text} from '../../../../Text/Text';
import { EIconName, Icon } from '../../../../Icons/Icon';

interface IMenuItemsListProps{
    postId: string;
    displayType: TMenuItemsList;
}
type TMenuItemsList = 'mobile' | 'desktop';
export function MenuItemsList(props: IMenuItemsListProps) {
    const [displayType, setDisplayType] = React.useState(props.displayType);

    return(
        <ul className={styles.menuItemsList}>

            {displayType == 'mobile'  && (
                <li className={styles.menuItem} onClick={() => console.log(props.postId)} >
                    <Icon size={14} name={EIconName.HideIcon}/>
                    <Text size={12} color={EColors.grey99}>Скрыть</Text>
                </li>
                )
            }
            {displayType == 'desktop' && (
                <>
                    <li className={styles.menuItem} onClick={() => console.log(props.postId)} >
                        <Icon size={14} name={EIconName.CommentIcon}/>
                        <Text size={14} color={EColors.grey99}>Комментарии</Text>
                    </li>
                    <li className={styles.menuItem} onClick={() => console.log(props.postId)} >
                        <Icon size={14} name={EIconName.ShareIcon}/>
                        <Text size={14} color={EColors.grey99}>Поделиться</Text>
                    </li>
                    <li className={styles.menuItem} onClick={() => console.log(props.postId)} >
                        <Icon size={14} name={EIconName.HideIcon}/>
                        <Text size={14} color={EColors.grey99}>Скрыть</Text>
                    </li>
                    
                    <li className={styles.menuItem} onClick={() => console.log(props.postId)} >
                        <Icon size={14} name={EIconName.SaveIcon}/>
                        <Text size={14} color={EColors.grey99}>Сохранить</Text>
                    </li>
                </>
                )
            }
            
            <div className={styles.divider}></div>

            <li className={styles.menuItem}>
                <Icon size={14} name={EIconName.WarningIcon}/>

                <Text size={12} color={EColors.grey99}>Пожаловаться</Text>
            </li>   
        </ul>
    );
}