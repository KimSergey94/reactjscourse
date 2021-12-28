import React from "react";

interface IItem{
    text: string;
    id: string;
    onClick: (id: string) => void;
    className?: string;
    As?: 'a' | 'li' | 'button' | 'div';
    href?: string;
}

interface IGenericListProps {
    list: IItem[];
}

// export function MyList({list}: IMyListProps) {
//     return (
//         <ul>
//             {list.map((item:IItem, index:number)=>(
//                 <li onClick={() => item.onClick(item.id)} key={index}>{item.value}</li>
//             ))}
//         </ul>
//     );
// }
const noop = () => {};


export function GenericList({list}: IGenericListProps){
    return(
        <>
            {list.map(({As = 'div', text, onClick = noop, className, id, href }) => (
                <As
                className={className}
                onClick={() => onClick(id)}
                key={id}
                href={href}
                >
                    {text}
                </As>
            ))}
        </>
    )
}


const jsxs = [
    <li key={0}>Content 0</li>,
    <li key={1}>Content 1</li>,
    <li key={2}>Content 2</li>,
    <li key={3}>Content 3</li>,
    <li key={4}>Content 4</li>
]