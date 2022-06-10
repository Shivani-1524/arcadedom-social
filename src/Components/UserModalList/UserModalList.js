import React, { useEffect, useState } from 'react'
import './usermodallist.css'
import { ProfileLargeThubmnail } from '../ProfileThumbnail/ProfileLargeThubmnail'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../Features/usersSlice'


const UserModalList = () => {
    const dispatch = useDispatch()
    const { value: { allUsers } } = useSelector(state => state.user)
    const { value: { userList } } = useSelector(state => state.modal)
    const getUserDetails = (allUsername) => {
        return userList.some((user) => user.username === allUsername)
    }
    const userDetailsList = allUsers.status === 'success' && allUsers.list.filter(user => getUserDetails(user.username))
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    return (
        <div className='userlist-wrapper flex-col'>
            {allUsers.status === 'success' && userDetailsList.map(user =>
                <ProfileLargeThubmnail props={user} />
            )}
        </div>
    )
}

export { UserModalList }