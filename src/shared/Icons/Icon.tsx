import classNames from 'classnames'
import React from 'react'
import { MenuIcon } from '.'
import { AnonIcon } from './AnonIcon'
import { CommentIcon } from './CommentIcon'
import { HideIcon } from './HideIcon'
import styles from './icon.less'
import { SaveIcon } from './SaveIcon'
import { ShareIcon } from './ShareIcon'
import { WarningIcon } from './WarningIcon'

export interface IDetailedIconProps {
  size?: number
}
interface IIconProps {
  name: EIconName
  size?: number
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
export type TIconSizes = 20 | 18 | 16 | 14 | 12 | 10

export function Icon(props: IIconProps) {
  const { name = 'CommentIcon', size = 14 } = props

  const classes = classNames(styles[`s${size}`])

  return (
    <div className={classes}>
      {props.name === EIconName.CommentIcon ? (
        <CommentIcon size={props.size} />
      ) : props.name === EIconName.HideIcon ? (
        <HideIcon size={props.size} />
      ) : props.name === EIconName.ShareIcon ? (
        <ShareIcon size={props.size} />
      ) : props.name === EIconName.MenuIcon ? (
        <MenuIcon size={props.size} />
      ) : props.name === EIconName.SaveIcon ? (
        <SaveIcon size={props.size} />
      ) : props.name === EIconName.AnonIcon ? (
        <AnonIcon size={props.size} />
      ) : props.name === EIconName.WarningIcon ? (
        <WarningIcon size={props.size} />
      ) : (
        ''
      )}
    </div>
  )
}
