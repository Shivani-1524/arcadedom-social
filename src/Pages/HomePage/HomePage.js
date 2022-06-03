import React, { useEffect } from 'react'
import './homepage.css'
import { UserPost } from '../../Components/UserPost/UserPost'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../Features/postsSlice'
import { CreatePost } from '../../Components/CreatePost/CreatePost'

const HomePage = () => {
    const { posts, status: postFetchStatus } = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPosts())
    }, [])

    return (
        <div className='homepage-container'>
            <CreatePost />
            <div className="posts-listing flex-col mg-t-50">
                {postFetchStatus === 'success' && posts.map((post) =>
                    <UserPost props={post} key={post._id} />
                )}
            </div>
        </div>
    )
}

export { HomePage }