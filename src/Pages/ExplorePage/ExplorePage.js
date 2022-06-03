import React, { useEffect } from 'react'
import { UserPost } from '../../Components/UserPost/UserPost'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../Features/postsSlice'

const ExplorePage = () => {
    const posts = useSelector((state) => state.posts.posts)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPosts())
    }, [])
    return (
        <div className='explore-container'>
            <div className="mg-t-40 flex-col">
                {posts.map(post => <UserPost />)}
            </div>
        </div>
    )
}

export { ExplorePage }