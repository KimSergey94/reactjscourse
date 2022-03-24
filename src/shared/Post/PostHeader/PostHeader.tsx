import React from 'react';
import { Menu } from '../../CardsList/Card/Menu';
import { EColors, Text } from '../../Text';
import styles from './postheader.less';
interface IPostHeader {
  cardId: number;
  idContainerResultMenu: string
}
export function PostHeader({cardId, idContainerResultMenu}: IPostHeader) {
  
  return (
    <div className={styles.post}>
      <div className={styles.textContainer}>
        <Text color={EColors.white}  size={10} As='p'>{10}% Проголосовали</Text>
      </div>
      <div className={styles.menuCalibration}>
        <Menu cardId={cardId}/>
      </div>
    </div>
  );
}
