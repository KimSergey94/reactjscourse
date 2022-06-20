import React, { useContext, useState } from "react";
import { displayTypeContext } from "../../context/displayTypeContext";
import styles from './card.less';
import { Controls, IControlsProps } from "./Controls/Controls";
import { IMenuProps, Menu } from "./Menu/Menu";
import { IPreviewProps, Preview } from "./Preview/Preview";
import { ITextContentProps, TextContent } from "./TextContent/TextContent";

export interface ICardProps{
    content: ITextContentProps;
    preview: IPreviewProps;
    // menuProps: IMenuProps;
    controls: IControlsProps;
    cardId: number;
}
export function Card(props: ICardProps){
    const [isModalOpened, setIsModalOpened] = useState(false)
    const handleClickModal = () => {
      setIsModalOpened(!isModalOpened)
    }

    props.content.handleOpenCommentModal = handleClickModal;
    
    return(
        <li className={styles.card} id={`card${props.cardId}`}>
            <TextContent displayName={props.content.displayName} postedTimeAgo={props.content.postedTimeAgo} title={props.content.title} imgLink={props.content.imgLink} isCommentModalOpened={isModalOpened} handleOpenCommentModal={handleClickModal} cardId={props.cardId}/>
            <Preview imgSrc={props.preview.imgSrc}/>
            <Menu cardId={props.cardId}/>
            <Controls karmaValue={props.controls.karmaValue} commentsNumber={props.controls.commentsNumber} />
        </li>
        // <li className={styles.card} id={`card${props.cardId}`}>
        //     <TextContent displayName={props.content.displayName} postedTimeAgo={props.content.postedTimeAgo} title={props.content.title} imgLink={props.content.imgLink} isCommentModalOpened={isModalOpened} handleOpenCommentModal={handleClickModal} cardId={props.cardId}/>
        //     <Preview imgSrc={props.preview.imgSrc}/>
        //     <Menu cardId={props.cardId}/>
        //     <Controls karmaValue={props.controls.karmaValue} commentsNumber={props.controls.commentsNumber} />
        // </li>
    );
}
