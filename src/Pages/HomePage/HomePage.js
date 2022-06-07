import React, { useEffect, useState } from 'react'
import './homepage.css'
import { UserPost } from '../../Components/UserPost/UserPost'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../Features/postsSlice'
import { CreatePost } from '../../Components/CreatePost/CreatePost'
import { sortPosts } from '../../Features/postsSlice'
const HomePage = () => {
    const { posts, postStatus, sortedBy } = useSelector((state) => state.posts)
    const dispatch = useDispatch()

    if (sortedBy === 'oldest') {
        dispatch(sortPosts('oldest'))
    } else if (sortedBy === 'trending') {
        dispatch(sortPosts('trending'))
    } else {
        dispatch(sortPosts('newest'))
    }

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    return (
        <div className='homepage-container'>
            <CreatePost />
            <div className="posts-listing flex-col mg-t-50">
                {postStatus === 'success' ? posts.map((post) =>
                    <UserPost props={post} key={post._id} />
                ) : <p>Loading Posts...</p>}
            </div>
        </div>
    )
}

export { HomePage }