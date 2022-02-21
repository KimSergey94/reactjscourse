import React from "react";
import {EColors, Text} from '../../../Text';
import styles from './userblock.less';
import { EIconName, Icon } from "../../../Icons/Icon";
import { Break } from "../../../Break/Break";

interface IUserBlockProps {
    avatarSrc?: string
    username?: string
}
export function UserBlock({avatarSrc, username}: IUserBlockProps){
    return(
        <a href="https://www.reddit.com/api/v1/authorize?client_id=vVMpMj5mCEsVK48LwY5AUw&response_type=code&state=random_string&redirect_uri=http://localhost:3000/auth&duration=permanent&scope=read submit identity"
        className={styles.userBox}>
            <div className={styles.avatarBox}>
                {avatarSrc
                ? <img src={avatarSrc} alt="user avatar" className={styles.avatarImage} /> 
                : <Icon name={EIconName.AnonIcon} size={47} />
                }
            </div>

            <div className={styles.username}>
                <Break size={12} />
                <Text size={20} color={username ? EColors.black : EColors.grey99} >{username || "Аноним"}</Text>
            </div>
        </a>
    );
}