import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from './dropdowncontent.less';

interface IDropdownContent{
    handleClick: () => void;
    children: React.ReactNode | string;
    cardId: number;
    onClose?: () => void;
  }
  export function DropdownContent({handleClick, children, cardId, onClose}:IDropdownContent) {
   const ref = useRef<HTMLDivElement>(null);
   
    useEffect(()=> {
      function handleClickedOut (event: MouseEvent){
        if(event.target instanceof Node && !ref.current?.contains(event.target))
          onClose?.()
      }
      document.addEventListener('click', handleClickedOut);
      return () => {
        document.removeEventListener('click', handleClickedOut)
      }
    }, [])
    
    
    const node = document.getElementById(`card${cardId}`);
    if(!node) return null
    return ReactDOM.createPortal((
      <div ref={ref} className={styles.list} onClick={handleClick}>
        {children}
      </div>
    ), node);
  }
  