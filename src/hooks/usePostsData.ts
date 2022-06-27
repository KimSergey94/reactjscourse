import axios from 'axios';
import { useEffect, useState } from 'react';
import { IControlsProps } from '../shared/CardsList/Card/Controls';
import { IPreviewProps } from '../shared/CardsList/Card/Preview';
import { ITextContentProps } from '../shared/CardsList/Card/TextContent';

interface IPostsData{
    content: ITextContentProps;
    preview: IPreviewProps;
    controls: IControlsProps;
}
export function usePostsData(){
    const [posts, setPosts] = useState<IPostsData[]>();

    useEffect(() => {
            axios.get('http://localhost:3000/posts')
            .then((resp) => {
                setPosts(resp.data);
            })
            .catch(console.log);
    }, [])

    return [posts];
}