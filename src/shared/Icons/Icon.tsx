import React from 'react';
import { MenuIcon } from '.';
import { CommentIcon } from './CommentIcon';
import { HideIcon } from './HideIcon';
import { SaveIcon } from './SaveIcon';
import { WarningIcon } from './WarningIcon';
import classNames from 'classnames';
import styles from './Icon.less';
import { ShareIcon } from './ShareIcon';
import { AnonIcon } from './AnonIcon';

export interface IDetailedIconProps{
    size?: number;
}
interface IIconProps{
    name: EIconName;
    size?: number;
}
export enum EIconName {
    CommentIcon = 'CommentIcon',
    HideIcon = 'HideIcon',
    MenuIcon = 'MenuIcon',
    SaveIcon = 'SaveIcon',
    ShareIcon = 'ShareIcon',
    WarningIcon = 'WarningIcon',
    AnonIcon = 'AnonIcon',
    
}
export type TIconSizes = 20 | 18 | 16 | 14 | 12 | 10;

export function Icon(props: IIconProps) {
    const { 
        name = 'CommentIcon', 
        size = 14, 
    } = props;


    const classes = classNames(
        styles[`s${size}`], 
    );

    return(
        <div className={classes}>
            { 
            props.name === EIconName.CommentIcon ? <CommentIcon size={props.size} /> :
            props.name === EIconName.HideIcon ? <HideIcon size={props.size} /> :
            props.name === EIconName.ShareIcon ? <ShareIcon size={props.size} /> :
            props.name === EIconName.MenuIcon ? <MenuIcon size={props.size} /> :
            props.name === EIconName.SaveIcon ? <SaveIcon size={props.size} /> :
            props.name === EIconName.AnonIcon ? <AnonIcon size={props.size} /> :
            props.name === EIconName.WarningIcon ? <WarningIcon size={props.size} /> : '' 
            }
        </div>
    );
}


