import React from 'react';


export type TDisplayType = 'mobile' | 'desktop';

type displayTypeContextType = {
    displayType: TDisplayType;
}

export const displayTypeContext = React.createContext<displayTypeContextType>({displayType:'desktop'});