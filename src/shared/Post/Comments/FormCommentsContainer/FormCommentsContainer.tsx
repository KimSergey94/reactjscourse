import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FormComments } from '../FormComments/FormComments';

interface IFormCommentsContainer{
    handleSubmit: (comment:string) => void;
    // handleChange: (e:ChangeEvent<HTMLTextAreaElement>) => void ;
    valueInput: string;
    name?: string;
    handleClicked?: () => void;
}
function f () {}
export function FormCommentsContainer({handleSubmit, valueInput, name, handleClicked = f }: IFormCommentsContainer) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=> {
    function handleClickedOut (event: MouseEvent){
      if(event.target instanceof Node && !ref.current?.contains(event.target))
        handleClicked?.()
    }
    document.addEventListener('click', handleClickedOut);
    return () => {
      document.removeEventListener('click', handleClickedOut)
    }
  }, [])
const [textAreaRows, setTextAreaRows] = useState(1);
const refInput = useRef<HTMLTextAreaElement>(null);
function focusOnInput (){
  refInput.current?.focus();
}
useEffect (()=> {
  focusOnInput ();
},[])
 function handleResize () {
    if(window.innerWidth >= 1024){
      setTextAreaRows(3)
      }
    else {
      setTextAreaRows(1)
      }
}

  useEffect(()=>{
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[])

  return (
    <FormComments
        handleSubmit={handleSubmit}
        // handleChange={handleChange}
        name={name}
        valueInput={valueInput}
        ref={ref}
        refInput={refInput}
        textAreaRows={textAreaRows}
    />
  );
}
