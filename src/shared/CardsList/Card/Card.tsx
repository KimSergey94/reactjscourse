import React from "react";
import styles from './card.less';
import { Controls, IControlsProps } from "./Controls/Controls";
import { IMenuProps, Menu } from "./Menu/Menu";
import { IPreviewProps, Preview } from "./Preview/Preview";
import { ITextContentProps, TextContent } from "./TextContent/TextContent";

interface ICardProps{
    content: ITextContentProps;
    preview: IPreviewProps;
    // menuProps: IMenuProps;
    controls: IControlsProps;
}
export function Card(props: ICardProps){
    return(
        <li className={styles.card}>
            <TextContent displayName={props.content.displayName} postedTimeAgo={props.content.postedTimeAgo} title={props.content.title} imgLink={props.content.imgLink} />
            <Preview imgSrc={props.preview.imgSrc}/>
            <Menu displayType="desktop"/>
            <Controls karmaValue={props.controls.karmaValue} commentsNumber={props.controls.commentsNumber} />
        </li>
    );
}
