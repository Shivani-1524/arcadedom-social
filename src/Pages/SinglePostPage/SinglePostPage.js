import React, { useState, useEffect } from 'react'
import { UserComment } from '../../Components/UserPost/Components/UserComment'
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../../Features/postsSlice';
import { UserPost } from '../../Components/UserPost/UserPost';
import { useNavigate, useParams } from 'react-router-dom'
import { EmptyPage } from '../../Components/EmptyPage';
import './singlepostpage.css'

const SinglePostPage = () => {
    const dispatch = useDispatch()
    const params = useParams();
    const navigate = useNavigate();
    const { postId } = params;
    const { posts } = useSelector(state => state.posts)
    const currentPost = posts?.find(post => post._id === postId)
    const [disabledComments, setDisabledComments] = useState(true);
    const [commentInput, setCommentInput] = useState('');

    const onCommentChange = (e) => {
        let userCommentTxt = e.target.value;
        setCommentInput(userCommentTxt);
        console.log(e.target.value)
        userCommentTxt.length === 0 ? setDisabledComments(true) : setDisabledComments(false);
    }
    const uploadComment = (e) => {
        console.log({ postId: postId, commentData: commentInput })
        dispatch(addComment({ postId: postId, commentData: commentInput }))
        setCommentInput('')
    }

    useEffect(() => {
        if (!currentPost) navigate('/')
    }, [posts])

    return (
        <div className='single-pg-layout '>
            {currentPost ?
                <div className='flex-col g-0'>
                    <UserPost props={currentPost} />
                    <div className="comment-section">
                        <div className='comments-listing flex-col'>
                            {currentPost.comments.map(comment => <UserComment key={comment._id} props={comment} postId={postId} />)}
                        </div>
                        <div className='add-comment-container'>
                            <label htmlFor="add-comment" className='visually-hidden'>Add a Comment</label>
                            <input id="add-comment" type="text" onChange={onCommentChange} value={commentInput} placeholder='Add a comment' />
                            <button onClick={uploadComment}
                                disabled={disabledComments} className={'btn primary-btn cta-btn ' + (disabledComments && ' disabled')}>
                                Post</button>
                        </div>
                    </div>
                </div>
                : <EmptyPage msg="This Post does not exist" />}
        </div>
    )
}

export { SinglePostPage }