import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookmarks } from '../../Features/postsSlice'
import { UserPost } from '../../Components/UserPost/UserPost'
import { EmptyPage } from '../../Components/EmptyPage'

const BookmarkPage = () => {
    const dispatch = useDispatch()
    const { bookmarks, postStatus } = useSelector(state => state.posts)
    useEffect(() => {
        dispatch(getAllBookmarks())
    }, [])

    return (
        <div className='explore-container'>
            {bookmarks.length > 0 ? <div className="mg-t-40 flex-col">
                {postStatus === 'success' ? bookmarks.map((post) =>
                    <UserPost props={post} key={post._id} />
                ) : <p>Loading Posts...</p>}
            </div> :
                <EmptyPage />}
        </div>
    )
}

export { BookmarkPage }