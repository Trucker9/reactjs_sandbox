import {useState} from 'react';

import useHttp from "../../hooks/use-http";
import {useParams} from "react-router-dom";
import NewCommentForm from './NewCommentForm';
import classes from './Comments.module.css';

const Comments = () => {
    const [isAddingComment, setIsAddingComment] = useState(false);

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };

    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className='btn' onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
            {isAddingComment && <NewCommentForm/>}
            <p>Comments...</p>
        </section>
    );
};

export default Comments;
