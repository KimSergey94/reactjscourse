import React from 'react';
import { IControlsProps } from '../CardsList/Card/Controls';
import { IPreviewProps } from '../CardsList/Card/Preview';
import { ITextContentProps } from '../CardsList/Card/TextContent';

interface IPostsContextData{
    content: ITextContentProps;
    preview: IPreviewProps;
    controls: IControlsProps;
}

export const postsContext = React.createContext<IPostsContextData[]|undefined>([]);