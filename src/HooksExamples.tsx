// Какие бьывают хуки:

// 1. useState
// 2. useEffect
// 3. useRef
// 4. useReducer
// 5. useMemo
// 6. useContext
// 7. useCallback
// 8. useImperativeHandle
// 9. useLayoutEffect
// 10. useDebugValue

import React from 'react';

export function MyHooks({title, id }: {title: string, id?: string}){
    // React.useEffect(()=>{
    //     console.log('componentDidMount');
    //     console.log('componentWillUpdate');
    // });
    // React.useEffect(()=>{
    //     console.log('componentDidMount');
    // }, []);
    // React.useEffect(()=>{
    //     console.log('componentWillReceiveProps: ', title);
    // }, [title]);

    // const [isMounted] = useIsMounted();
    // React.useEffect(() => {
    //     console.log('isMounted', isMounted);
    // }, [isMounted])

    const items = 10
    const multiplier = 5
    const result = React.useMemo(
        () => {
            console.log("CALC")
            calculate(items, multiplier)
        },
        [items, multiplier]
    )

    return(
        <div>{title} {id} </div>
        // {result}
    )
}


export function useIsMounted() {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    return [isMounted]
}


export function calculate(items:number, multiplier:number) {
    return new Array(items).fill(1).reduce((a,v) => a * multiplier);
}