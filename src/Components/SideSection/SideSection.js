import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import "./sidesection.css";
import { FontAwesomeIcon, faSearch } from '../../Assets/icons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { sortPosts } from '../../Features/postsSlice';
import { ProfileLargeThubmnail } from '../ProfileThumbnail/ProfileLargeThubmnail';
import { getUserData, getAllUsers } from '../../Features/usersSlice'

const SideSection = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const currentRoute = location.pathname
    const { value: { status, allUsers: allUsersData } } = useSelector((state) => state.user)
    const handlePostSort = (e) => {
        dispatch(sortPosts(e.target.value))
    }
    const { currentUser } = useSelector((state) => state.auth)
    const { username: currentUsername } = JSON.parse(currentUser)
    const [searchedUsers, setSearchedUsers] = useState([]);

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    const getSuggestedUsers = (userData) => {
        if (userData.username !== currentUsername) {

            let isFollowerCurruser = userData.followers.some(user => user.username === currentUsername)
            if (!isFollowerCurruser) return <ProfileLargeThubmnail props={userData} />
            return null
        } return null
    }

    const searchHelper = (data, input) => {
        return data.toLowerCase().includes(input)
    }

    const handleUserSearch = (e) => {
        if (e.target.value == '') setSearchedUsers([])
        else {
            let input = e.target.value.toLowerCase()
            const searchResult = allUsersData.list.filter(userData => searchHelper(userData.username, input) || searchHelper(userData.firstName, input) || searchHelper(userData.lastName, input))

            setSearchedUsers(searchResult)
        }

    }

    return (
        <aside className="filters-container light-txt">
            {currentRoute === '/' && <div className='sort-container flex-row'>
                <p>Sort Posts</p>
                <select className='sort-dropdown' onChange={handlePostSort} name="sort posts">
                    <option value="newest">Newest</option>
                    <option value="trending">Trending</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>}
            <div className="nav-search-bar hide-sm">
                <label className='visually-hidden' htmlFor='search-users'>Search Users</label>
                <input id="search-users" className="search-bar" onChange={handleUserSearch} type="text" placeholder="Search ..." />
                <FontAwesomeIcon icon={faSearch} className="nav-search" />
            </div>
            <p>{searchedUsers.length > 0 ? 'Searched Users' : 'Find Your Buddies'}</p>
            <div className='user-listing flex-col'>
                {searchedUsers.length > 0 ?
                    searchedUsers.map(userData => <ProfileLargeThubmnail props={userData} />) :
                    status === 'success' && allUsersData.status === 'success' &&
                    allUsersData.list.map(userData => getSuggestedUsers(userData))
                }
            </div>
        </aside>
    )
}

export { SideSection }