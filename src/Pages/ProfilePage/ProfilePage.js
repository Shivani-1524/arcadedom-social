import React, { useEffect, useState } from 'react'
import './profilepage.css'
import { useSelector, useDispatch } from 'react-redux'
import { getUserData, getUserPosts, unfollowUser, followUser } from '../../Features/usersSlice'
import { hideModal } from '../../Features/modalSlice'
import { UserPost } from '../../Components/UserPost/UserPost'
import { EmptyPage } from '../../Components/EmptyPage'
import { useParams } from 'react-router-dom'
import { UserDesc } from './Components/UserDesc'
import { EditProfile } from './Components/EditProfile/EditProfile'
import { ModalComponent } from '../../Components/ModalComponent/ModalComponent'

const ProfilePage = () => {
    const { currentUser } = useSelector(state => state.auth)
    const { value: { status, userPosts, userData } } = useSelector(state => state.user)
    const { username: currentUsername } = JSON.parse(currentUser)
    const dispatch = useDispatch()
    const params = useParams()
    const { username } = params
    const [toggleEditProfile, setToggleEditProfile] = useState(false)

    useEffect(() => {
        dispatch(getUserPosts({ username }))
        dispatch(getUserData({ username }))
    }, [username])

    const isFollower = userData && userData.followers.some(user => user.username === currentUsername)
    const handleFollowerClick = () => {
        isFollower ? dispatch(unfollowUser({ followUserId: userData._id })) : dispatch(followUser({ followUserId: userData._id }))
    }

    return (
        <div className='profile-pg-layout'>
            {toggleEditProfile && <ModalComponent type='editprofile' hideModalToggle={() => setToggleEditProfile(false)}>
                <EditProfile hideModalToggle={() => setToggleEditProfile(false)} props={userData} />
            </ModalComponent>}
            {currentUsername === username ? <button onClick={() => setToggleEditProfile(true)} className="btn primary-outlined-btn pos-abs edit-profile-btn">
                Edit Profile
            </button> : <button className='btn primary-outlined-btn pos-abs edit-profile-btn' onClick={handleFollowerClick}>{isFollower ? 'Unfollow' : 'Follow'}</button>}
            {userData && userPosts && <UserDesc props={userData} postCount={userPosts.length} />}
            <div className="posts-listing flex-col mg-t-60">
                {status === 'success' ?
                    (userPosts.length > 0 ?
                        userPosts.map((post) => <UserPost props={post} key={post._id} />).reverse() : <EmptyPage />)
                    : <p>Loading Posts...</p>}
            </div>
        </div>
    )
}

export { ProfilePage } 