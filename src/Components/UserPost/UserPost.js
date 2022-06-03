import React, { useState, useEffect } from 'react'
import './userpost.css'
import { FontAwesomeIcon, faHeart, farHeart, faBookmark, farBookmark, faComment, faEllipsisVertical, faThumbsDown, faThumbsUp } from '../../Assets/icons/icons'
import { ProfileThumbnail } from '../../Components'
import { UserComment } from './Components/UserComment'
import { PostDrawer } from './Components/PostDrawer'
import { getPostDate } from '../../Utils/getPostDate'

const UserPost = ({ props }) => {

    const { content, likes: { likeCount, likedBy }, username, firstName, lastName, comments, createdAt, updatedAt, } = props
    const [toggleComments, setToggleComments] = useState(false);
    const [disabledComments, setDisabledComments] = useState(true);
    const [commentInput, setCommentInput] = useState('');
    const [toggleLike, setToggleLike] = useState(false);
    const [toggleBookmark, setToggleBookmark] = useState(false);
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [createdDateTxt, setCreatedDateTxt] = useState('');

    const onCommentChange = (e) => {
        let userCommentTxt = e.target.value;
        setCommentInput(userCommentTxt);
        console.log(userCommentTxt)
        userCommentTxt.length === 0 ? setDisabledComments(true) : setDisabledComments(false);
    }

    useEffect(() => {
        setCreatedDateTxt(getPostDate(createdAt))
    }, []);


    return (
        <div className="user-post-container pos-rel">
            {toggleDrawer &&
                <div><PostDrawer hideDrawer={() => setToggleDrawer(false)} /></div>
            }
            <div className='creator-row flex-row'>
                <ProfileThumbnail username={firstName + lastName} />
                <p className='light-grey-txt'>@{username} .</p>
                <p className='light-grey-txt'>{createdDateTxt}</p>
                <div className='space'></div>
                <FontAwesomeIcon onClick={() => setToggleDrawer(prev => !prev)} className='icon-size-rg ellipsis-icon' icon={faEllipsisVertical} />
            </div>
            <div className='post-content'>
                <p>{content}</p>
            </div>
            <div className='post-actions flex-row'>
                <div className='flex-row action-count'>
                    <p>{likeCount}</p>
                    <FontAwesomeIcon onClick={() => setToggleLike(prev => !prev)} icon={toggleLike ? faHeart : farHeart} className='icon-size-md' />
                </div>
                <div className='flex-row action-count'>
                    <p>{comments.length}</p>
                    <FontAwesomeIcon onClick={() => setToggleComments(prev => !prev)} icon={faComment} className='icon-size-md' />
                </div>
                <div className="space"></div>
                <FontAwesomeIcon onClick={() => setToggleBookmark(prev => !prev)} icon={toggleBookmark ? faBookmark : farBookmark} className='icon-size-md' />
            </div>
            {toggleComments && <div>
                <div className='comments-listing flex-col'>
                    {comments.map(comment => <UserComment key={comment._id} props={comment} />)}
                </div>
                <div className='add-comment-container'>
                    <label htmlFor="add-comment" className='visually-hidden'>Add a Comment</label>
                    <input id="add-comment" type="text" onChange={onCommentChange} value={commentInput} placeholder='Add a comment' />
                    <button disabled={disabledComments} className={'btn primary-btn cta-btn ' + (disabledComments && ' disabled')}>Post</button>
                </div>
            </div>}
        </div>
    )
}

export { UserPost }