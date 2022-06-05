import React, { useState, useEffect } from 'react'
import './userpost.css'
import { FontAwesomeIcon, faSpinner, faHeart, farHeart, faBookmark, farBookmark, faComment, faEllipsisVertical, faThumbsDown, faThumbsUp } from '../../Assets/icons/icons'
import { ProfileThumbnail } from '../../Components'
import { UserComment } from './Components/UserComment'
import { PostDrawer } from './Components/PostDrawer'
import { getPostDate } from '../../Utils/getPostDate'
import { useSelector, useDispatch } from 'react-redux'
import { likePost, dislikePost, bookmarkPost, removeBookmark } from '../../Features/postsSlice'

const UserPost = ({ props }) => {
    const dispatch = useDispatch()
    const { content, likes: { likeCount, likedBy }, username, firstName, lastName, comments, createdAt, updatedAt, _id } = props
    const [toggleComments, setToggleComments] = useState(false);
    const [disabledComments, setDisabledComments] = useState(true);
    const [commentInput, setCommentInput] = useState('');
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const createdDateTxt = getPostDate(createdAt)
    const { currentUser } = useSelector(state => state.auth)
    const { username: currentUsername } = JSON.parse(currentUser)
    const { likeStatus, bookmarkStatus, bookmarks } = useSelector(state => state.posts)

    const isLiked = likedBy.some(likedUser => likedUser.username === currentUsername)
    const isBookmarked = bookmarks.some(bookmark => bookmark._id === _id)

    const onCommentChange = (e) => {
        let userCommentTxt = e.target.value;
        setCommentInput(userCommentTxt);
        userCommentTxt.length === 0 ? setDisabledComments(true) : setDisabledComments(false);
    }

    const handleLikePost = (isLiked, postId) => {
        isLiked ? dispatch(dislikePost(postId)) : dispatch(likePost(postId))
    }
    const handleBookmarkPost = (isBookmarked, postId) => {
        isBookmarked ? dispatch(removeBookmark(postId)) : dispatch(bookmarkPost(postId))
    }

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
                {username === currentUsername && <FontAwesomeIcon onClick={() => setToggleDrawer(prev => !prev)} className='icon-size-rg ellipsis-icon' icon={faEllipsisVertical} />}
            </div>
            <div className='post-content'>
                <p>{content}</p>
            </div>
            <div className='post-actions flex-row'>
                <div className='flex-row action-count'>
                    <p className='pointer'>{likeCount}</p>
                    {(likeStatus.status === 'loading' && likeStatus.loadId == _id) ?
                        <FontAwesomeIcon icon={faSpinner} className='icon-size-md grey-txt' /> :
                        <FontAwesomeIcon onClick={async () => handleLikePost(isLiked, _id)} icon={isLiked ? faHeart : farHeart} className='icon-size-md pointer' />}
                </div>
                <div className='flex-row action-count'>
                    <p>{comments.length}</p>
                    <FontAwesomeIcon onClick={() => setToggleComments(prev => !prev)} icon={faComment} className='icon-size-md pointer' />
                </div>
                <div className="space"></div>
                {(bookmarkStatus.status === 'loading' && bookmarkStatus.loadId == _id) ?
                    <FontAwesomeIcon icon={faSpinner} className='icon-size-md grey-txt' /> :
                    <FontAwesomeIcon onClick={() => handleBookmarkPost(isBookmarked, _id)} icon={isBookmarked ? faBookmark : farBookmark} className='icon-size-md pointer' />}
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