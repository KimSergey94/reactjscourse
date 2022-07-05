import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateComment } from '../../store/store';
import { CommentForm } from '../CommentForm/CommentForm';


export class Comment{
    value = 'Привет из MobX';

    constructor(){
        makeAutoObservable(this);
    }

    updateValue(newValue:string){
        this.value = newValue;
    }
}

const myComment = new Comment();

export const CommentFormContainer = observer(()=>{
    // const value = useSelector<RootState, string>(state => state.commentText);
    // const dispatch = useDispatch();

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>){
        // dispatch(updateComment(event.target.value));
        myComment.updateValue(event.target.value);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        console.log(myComment.value);
    }
    

    return(
        <CommentForm
            value={myComment}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
})