import React from 'react';
import { CommentIcon } from '../../../../Icons/CommentIcon';
import { WarningIcon } from '../../../../Icons/WarningIcon';
import styles from './menuitemslist.less';
import {EColors, Text} from '../../../../Text/Text';

interface IMenuItemsList{
    postId: string;
}
export function MenuItemsList({ postId }: IMenuItemsList) {
    return(
        <ul className={styles.menuItemsList}>
            <li className={styles.menuItem} onClick={() => console.log(postId)}>
                <CommentIcon/>
                <Text size={12} color={EColors.grey99}>Скрыть</Text>
            </li>

            <div className={styles.divider}></div>

            <li className={styles.menuItem}>
                <WarningIcon/>
                <Text size={12} color={EColors.grey99}>Пожаловаться</Text>
            </li>   
        </ul>
    );
}