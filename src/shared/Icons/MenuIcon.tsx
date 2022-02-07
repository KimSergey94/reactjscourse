import React from 'react';
import {IDetailedIconProps} from './Icon';

export function MenuIcon (props:IDetailedIconProps) {
    var size = props.size?props.size:14;
    return (
        <svg width={size} height={size} viewBox="0 0 5 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2.5" cy="2.5" r="2.5" fill="#D9D9D9"/>
            <circle cx="2.5" cy="10" r="2.5" fill="#D9D9D9"/>
            <circle cx="2.5" cy="17.5" r="2.5" fill="#D9D9D9"/>
        </svg>
    );
}