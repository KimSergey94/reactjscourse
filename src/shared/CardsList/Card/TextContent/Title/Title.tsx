import React, { useState } from 'react';
import styles from './title.less';

export function Title() {
    const [isModalOpened, setIsModalOpened] = useState(false);
    return(
        <h2 className={styles.title} onClick={()=>console.log('clicked')}>
            <a href='#post-url' className={styles.postLink} onClick={()=> setIsModalOpened(true)}>
                Следует отметить, что новая модель организационной деятельности Следует отметить, что новая модель организационной деятельности 
            </a>
{/* 
            {isModalOpened &&(
                <div><Post 
                onClose={()=>{ setIsModalOpened(false); }}/></div>                
            )} */}
        </h2>
    );
}