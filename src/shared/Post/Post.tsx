import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { CommentForm } from '../CommentForm';
import styles from './post.less';

interface IPost{
    onClose?: ()=>void;
}
export function Post(props: IPost){
    const ref = useRef<HTMLDivElement>(null);

    useEffect(()=> {
        function handleClick(event: MouseEvent){
            if(event.target instanceof Node && !ref.current?.contains(event.target))
                props.onClose?.();
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, []);


    const node = document.querySelector('#modal_root');
    if(!node) return null

    return ReactDOM.createPortal((
        <div className={styles.modal} ref={ref}>
            <h2>Следует отметить, что новая модель организационной деятельности поможет</h2>

            <div className={styles.content}>
                <p>Есть над чем задуматься: тщательные исследования конкурентов представляют собой не что иное, как фуфывйцу</p>
                <p>Есть над чем задуматься: тщательные исследования конкурентов представляют собой не что иное, как фуфывйцу</p>
                <p>Есть над чем задуматься: тщательные исследования конкурентов представляют собой не что иное, как фуфывйцу</p>
            </div>

            <CommentForm/>  
        </div>
    ), node);
}