import React, { useEffect } from 'react'
import './homepage.css'
import { UserPost } from '../../Components/UserPost/UserPost'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../Features/postsSlice'
import { CreatePost } from '../../Components/CreatePost/CreatePost'
import { sortPosts } from '../../Features/postsSlice'
import { EmptyPage } from '../../Components/EmptyPage'
import { getUserData } from '../../Features/usersSlice'

const HomePage = () => {
    const { posts, postStatus, sortedBy } = useSelector((state) => state.posts)
    const { currentUser } = useSelector((state) => state.auth)
    const { value: { status, userData } } = useSelector((state) => state.user)
    const { username } = JSON.parse(currentUser)
    const dispatch = useDispatch()

    const isFollowingUser = (username) => userData.following.some(user => user.username === username)

    const homePosts = postStatus === 'success' && status === 'success' && posts.filter((post) => isFollowingUser(post.username))

    useEffect(() => {
        dispatch(getPosts())
        dispatch(getUserData({ username }))
    }, [])

    useEffect(() => {
        if (sortedBy === 'oldest') {
            dispatch(sortPosts('oldest'))
        } else if (sortedBy === 'newest') {
            dispatch(sortPosts('newest'))
        }
    }, [sortedBy])

    return (
        <div className='homepage-container'>
            <CreatePost />
            <div className="posts-listing flex-col mg-t-50">
                {postStatus === 'success' ?
                    (homePosts.length > 0 ?
                        homePosts.map((post) => <UserPost props={post} key={post._id} />) :
                        <EmptyPage msg="Find Buddies To follow to make your feed fun!" />)
                    : <p>Loading Posts...</p>
                }
            </div>
        </div>
    )
}

export { HomePage }