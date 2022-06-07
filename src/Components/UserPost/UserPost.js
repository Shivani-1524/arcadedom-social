import React, { useState, useEffect } from 'react'
import './userpost.css'
import { FontAwesomeIcon, faCircleXmark, faImage, faSpinner, faHeart, farHeart, faBookmark, farBookmark, faComment, faEllipsisVertical, faThumbsDown, faThumbsUp } from '../../Assets/icons/icons'
import { ProfileThumbnail } from '../../Components'
import { UserComment } from './Components/UserComment'
import { PostDrawer } from './Components/PostDrawer'
import { getPostDate } from '../../Utils/getPostDate'
import { useSelector, useDispatch } from 'react-redux'
import { likePost, dislikePost, bookmarkPost, removeBookmark, editPost, deletePost } from '../../Features/postsSlice'
import { gifSelection } from '../../Features/postsSlice'
import { showModal } from '../../Features/modalSlice'

const UserPost = ({ props }) => {
    const dispatch = useDispatch()
    const { content, likes: { likeCount, likedBy }, postImage, username, firstName, lastName, comments, createdAt, updatedAt, _id } = props
    const [toggleComments, setToggleComments] = useState(false);
    const [disabledComments, setDisabledComments] = useState(true);
    const [commentInput, setCommentInput] = useState('');
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [toggleEditPost, setToggleEditPost] = useState(false);
    const createdDateTxt = getPostDate(createdAt)
    const { currentUser } = useSelector(state => state.auth)
    const { username: currentUsername } = JSON.parse(currentUser)
    const { likeStatus, bookmarkStatus, bookmarks, gifUrlSelected } = useSelector(state => state.posts)
    const initialEditState = { content: content, initPostMedia: postImage, editPostMedia: '' }
    const [editPostContent, setEditPostContent] = useState(initialEditState)
    const isLiked = likedBy.some(likedUser => likedUser.username === currentUsername)
    const isBookmarked = bookmarks.some(bookmark => bookmark._id === _id)

    useEffect(() => {
        setEditPostContent(initialEditState)
    }, [])

    const onCommentChange = (e) => {
        let userCommentTxt = e.target.value;
        setCommentInput(userCommentTxt);
        userCommentTxt.length === 0 ? setDisabledComments(true) : setDisabledComments(false);
    }

    const handleLikePost = (isLiked, postId) => {
        isLiked ? dispatch(dislikePost(postId)) : dispatch(likePost(postId))
    }
    const handleBookmarkPost = (isBookmarked, postId) => {
        isBookmarked ? dispatch(removeBookmark(_id)) : dispatch(bookmarkPost(_id))
    }

    const updatePost = (e) => {
        e.preventDefault();
        if (!editPostContent.editPostMedia && !editPostContent.initPostMedia && !editPostContent.content && !gifUrlSelected) {
            setToggleEditPost(false)
            return;
        }
        else if (editPostContent.editPostMedia || editPostContent.initPostMedia) {
            const cloudinaryPreset = process.env.REACT_APP_CLOUDINARY_KEY;
            const formData = new FormData()
            editPostContent.editPostMedia ? formData.append("file", editPostContent.editPostMedia) : formData.append("file", editPostContent.initPostMedia)
            formData.append("upload_preset", cloudinaryPreset)
            console.log("Form Data: ", ...formData);
            fetch('https://api.cloudinary.com/v1_1/ds9sho1ch/image/upload',
                { method: "POST", body: formData })
                .then((res) => res.json())
                .then((json) => {
                    console.log('data', json)
                    dispatch(editPost({ postData: { content: editPostContent.content, postImage: json.url }, postId: _id }))
                    setToggleEditPost(false)
                    setEditPostContent('')
                    dispatch(gifSelection(''))
                })
        } else {
            dispatch(editPost({ postData: { content: editPostContent.content, postImage: gifUrlSelected }, postId: _id }))
            setToggleEditPost(false)
            setEditPostContent('')
            dispatch(gifSelection(''))
        }
    }

    console.log('EDIT POST CONTENT:', editPostContent)

    return (
        <div className="user-post-container pos-rel">
            {toggleDrawer &&
                <div><PostDrawer enableEditPost={() => setToggleEditPost(true)} deletePost={() => dispatch(deletePost(_id))} hideDrawer={() => setToggleDrawer(false)} /></div>
            }
            <div className='creator-row flex-row'>
                <ProfileThumbnail username={firstName + lastName} />
                <p className='light-grey-txt'>@{username} .</p>
                <p className='light-grey-txt'>{createdDateTxt}</p>
                <div className='space'></div>
                {username === currentUsername && <FontAwesomeIcon onClick={() => setToggleDrawer(prev => !prev)} className='icon-size-rg ellipsis-icon' icon={faEllipsisVertical} />}
            </div>
            {toggleEditPost ?
                <div>
                    <textarea className='edit-post-txtarea' placeholder='Edit post..' onChange={(e) => {
                        setEditPostContent(prev => ({ ...prev, content: e.target.value }))
                    }} defaultValue={editPostContent.content}></textarea>
                    {(editPostContent.initPostMedia || editPostContent.editPostMedia || gifUrlSelected !== '') && <div className='pos-rel'>
                        <FontAwesomeIcon onClick={() => {
                            setEditPostContent(prev => ({ ...prev, editPostMedia: '', initPostMedia: '' }))
                            dispatch(gifSelection(''))
                        }} className='pos-abs pointer close-icon-img' icon={faCircleXmark} />
                        {editPostContent.initPostMedia && <img className='img-resp GIF edit-img-preview' src={editPostContent.initPostMedia} alt="post preview" />}
                        {gifUrlSelected ? <img className='img-resp img-preview' src={gifUrlSelected} alt="post preview" /> :
                            !editPostContent.initPostMedia && <img className='img-resp img-preview'
                                src={URL.createObjectURL(new Blob([editPostContent.editPostMedia], { type: "application/zip" }))} alt="post preview" />}
                    </div>}
                    <div className='edit-post-action flex-row'>
                        <div className='image-upload-wrapper'>
                            <label htmlFor="upload-edit-img">
                                <FontAwesomeIcon className="pointer icon-size-rg" icon={faImage} />
                            </label>
                            <input value="" id="upload-edit-img" className='visually-hidden' type="file"
                                onChange={(e) => {
                                    console.log(e.target.files[0])
                                    setEditPostContent(prev => ({ ...prev, editPostMedia: e.target.files[0], initPostMedia: null }))
                                    dispatch(gifSelection(''))
                                }} accept="image/*" />
                        </div>
                        <p className='pointer sm-p' onClick={() => { dispatch(showModal({ type: 'selectgif' })) }}> GIF </p>
                        <div className="space"></div>
                        <button onClick={() => setToggleEditPost(false)} className="btn primary-outlined-btn cta-btn">Cancel</button>
                        {(editPostContent.editPostMedia || editPostContent.initPostMedia || editPostContent.content || gifUrlSelected) && <button onClick={updatePost} className="btn primary-btn solid cta-btn">Save</button>}
                    </div>

                </div>
                :
                <div>
                    <div className='post-content'>
                        <p>{content}</p>
                    </div>
                    {postImage && <div className='post-content'>
                        <img src={postImage} className="img-resp img-size" alt="post giphy" />
                    </div>}
                </div>
            }
            <div className='post-actions flex-row'>
                <div className='flex-row action-count'>
                    <p className='pointer'>{likeCount}</p>
                    {(likeStatus.status === 'loading' && likeStatus.loadId === _id.toString()) ?
                        <FontAwesomeIcon icon={faSpinner} className='icon-size-md grey-txt' /> :
                        <FontAwesomeIcon onClick={async () => handleLikePost(isLiked, _id)} icon={isLiked ? faHeart : farHeart} className='icon-size-md pointer' />}
                </div>
                <div className='flex-row action-count'>
                    <p>{comments.length}</p>
                    <FontAwesomeIcon onClick={() => setToggleComments(prev => !prev)} icon={faComment} className='icon-size-md pointer' />
                </div>
                <div className="space"></div>
                {(bookmarkStatus.status === 'loading' && bookmarkStatus.loadId.toString() === _id.toString()) ?
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