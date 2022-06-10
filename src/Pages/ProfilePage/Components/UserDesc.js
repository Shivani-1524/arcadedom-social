import React from 'react'
import { FontAwesomeIcon, faLink } from '../../../Assets/icons/icons'
import dummyImg from '../../../Assets/images/dummyface1.jpg'
import { useDispatch } from 'react-redux'
import { showModal } from '../../../Features/modalSlice'
import '../profilepage.css'

const UserDesc = ({ props, postCount }) => {
    const { firstName, lastName, bioLink, bio, avatarURL, username, followers, following } = props
    const dispatch = useDispatch()

    const openModal = (list) => {
        dispatch(showModal({ type: 'userlist', list: list }))
    }

    return (
        <div className='flex-row profile-desc'>
            <div className='profile-img-wrapper'>
                <div className="avatar lg">
                    <img className="avatar-img" src={avatarURL ? avatarURL : dummyImg} alt="profile avatar" />
                </div>
            </div>
            <div className='flex-col profile-desc-txt mg-t-10'>
                <div className="profile-tag flex-row">
                    <p className='rg-p'> {firstName + lastName} </p> <p className='sm-p light-grey-txt'>@{username}</p>
                </div>
                <p className='wrap-p'>{bio}</p>
                <span> <FontAwesomeIcon icon={faLink} className='icon-size-rg' /> <a target='_blank' rel="noreferrer" className='bio-link user-stat' href={bioLink}>{bioLink}</a></span>
                <div className="flex-row mg-t-5 user-stats">
                    <p>{postCount} {(postCount === 1) ? 'Post' : 'Posts'}</p>
                    <p className='pointer user-stat' onClick={() => openModal(followers)} >{followers.length} followers</p>
                    <p className='pointer user-stat' onClick={() => openModal(following)}>{following.length} following</p>
                </div>
            </div>
        </div>
    )
}

export { UserDesc }