import React, { useEffect, useState } from 'react'
import '../userpost.css'
import { ProfileThumbnail } from '../../ProfileThumbnail/ProfileThumbnail'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon, faTrash, faEdit } from '../../../Assets/icons/icons'
import { editComment, deleteComment } from '../../../Features/postsSlice'

const UserComment = ({ props, postId }) => {
    const { username, commentData, _id } = props
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.auth)
    const { username: currentUsername } = JSON.parse(currentUser)
    const [toggleEdit, setToggleEdit] = useState(false);
    const [editedCommentTxt, setEditedCommentTxt] = useState(commentData)

    const updateComment = () => {
        dispatch(editComment({ postId, commentId: _id, commentData: editedCommentTxt }))
        setToggleEdit(false)
    }
    const deleteUserComment = () => {
        dispatch(deleteComment({ postId, commentId: _id }))
    }

    return (
        <div className="comment-wrapper flex-row">
            <div className='flex-row comment'>
                <ProfileThumbnail username={username} />
                {toggleEdit ?
                    <div>
                        <label className="visually-hidden" htmlFor="edit-comment-text">Edit Comment</label>
                        <input defaultValue={editedCommentTxt} onChange={(e) => setEditedCommentTxt(e.target.value)} type="text" id="edit-comment-text" className='edit-comment-input' />
                    </div> : <p className='wrap-p'>{commentData}</p>}
            </div>
            {(currentUsername === username) && !toggleEdit && <div className='flex-row'>
                <FontAwesomeIcon onClick={deleteUserComment} icon={faTrash} className="orange-txt pointer" />
                <FontAwesomeIcon onClick={() => { setToggleEdit(true) }} icon={faEdit} className="pointer" />
            </div>}
            {toggleEdit &&
                <div className='flex-row g-10'>
                    <button onClick={() => setToggleEdit(false)} className='btn primary-outlined-btn error cta-btn'>Cancel</button>
                    {editedCommentTxt && <button onClick={updateComment} className='btn primary-outlined-btn cta cta-btn'>Save</button>}
                </div>
            }

        </div>
    )
}

export { UserComment }