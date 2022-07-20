import React from 'react'
import { Dropdown } from '../../../components/Dropdown'
import { DropdownContent } from '../../../components/Dropdown/DropdownContent'
import { EColors, Text } from '../../../components/Text'
import styles from './menu.less'
import { MenuItemsList } from './MenuItemsList'

export interface IMenuProps {
  cardId: string
}

export function Menu(props: IMenuProps) {
  return (
    <div className={styles.menu}>
      <Dropdown cardId={props.cardId} isOpen={false}>
        <DropdownContent>
          <div className={styles.dropdown}>
            <MenuItemsList postId={'123'} />
            <button className={styles.closeButton}>
              <Text mobileSize={12} size={14} color={EColors.grey66}>
                Закрыть
              </Text>
            </button>
          </div>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}
