import React, { useContext } from "react";
import { displayTypeContext } from "../../context/displayTypeContext";
import styles from './card.less';
import { Controls, IControlsProps } from "./Controls/Controls";
import { ICardMenuOpened, IMenuProps, Menu } from "./Menu/Menu";
import { IPreviewProps, Preview } from "./Preview/Preview";
import { ITextContentProps, TextContent } from "./TextContent/TextContent";

interface ICardProps{
    content: ITextContentProps;
    preview: IPreviewProps;
    // menuProps: IMenuProps;
    controls: IControlsProps;
    cardId: number;
    cards?: ICardMenuOpened;
}
export function Card(props: ICardProps){
    const displayType = useContext(displayTypeContext);

    return(
        <li className={styles.card}>
            <TextContent displayName={props.content.displayName} postedTimeAgo={props.content.postedTimeAgo} title={props.content.title} imgLink={props.content.imgLink} />
            <Preview imgSrc={props.preview.imgSrc}/>
            <Menu displayType={displayType.displayType} cardId={props.cardId} cards={props.cards}/>
            <Controls karmaValue={props.controls.karmaValue} commentsNumber={props.controls.commentsNumber} />
        </li>
    );
}