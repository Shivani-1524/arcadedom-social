import React, { useEffect } from 'react'
import dummyface1 from '../../Assets/images/dummyface1.jpg'
import './profilethumbnail.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../Features/usersSlice'
import { useNavigate } from 'react-router-dom'

const ProfileThumbnail = ({ username }) => {
    const { value: { allUsers } } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUsers())
    }, []);
    const user = allUsers.status === 'success' && allUsers.list.find(user => user.username === username)
    return (
        <div onClick={() => {
            navigate(`/profile/${username}`)
        }} className='flex-row profile-thubnail-wrapper pointer'>
            <div className="op-avatar avatar sm">
                {allUsers.status === 'success' && <img className="avatar-img" src={user.avatarURL ? user.avatarURL : dummyface1} alt="original poster profile" />}
            </div>
            <p className='bold'>{user.firstName + user.lastName}</p>
            <p className='light-grey-txt'>@{username} .</p>
        </div>
    )
}

export { ProfileThumbnail }