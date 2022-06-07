import React, { useEffect } from 'react'
import { UserPost } from '../../Components/UserPost/UserPost'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../Features/postsSlice'

const ExplorePage = () => {
    const { posts, postStatus } = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPosts())
    }, [])
    return (
        <div className='explore-container'>
            <div className="mg-t-40 flex-col">
                {postStatus === 'success' ? posts.map((post) =>
                    <UserPost props={post} key={post._id} />
                ) : <p>Loading Posts...</p>}
            </div>
        </div>
    )
}

export { ExplorePage }