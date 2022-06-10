import React from 'react'
import dummyface1 from '../../Assets/images/dummyface1.jpg'
import './profilethumbnail.css'
import { Link, useNavigate } from 'react-router-dom'
import { hideModal } from '../../Features/modalSlice'
import { useDispatch } from 'react-redux'

const ProfileLargeThubmnail = ({ props }) => {
    const dispatch = useDispatch()
    const { firstName, lastName, username, avatarURL } = props
    const navigate = useNavigate()
    return (
        <div onClick={() => {
            navigate(`profile/${username}`)
            dispatch(hideModal())
        }} className='listed-user-profile'>
            <div className="avatar rg">
                <img className="avatar-img" src={avatarURL ? avatarURL : dummyface1} alt="profile" />
            </div>
            <div>
                <p>{firstName + lastName}</p>
                <p>@{username}</p>
            </div>
        </div>
    )
}

export { ProfileLargeThubmnail }