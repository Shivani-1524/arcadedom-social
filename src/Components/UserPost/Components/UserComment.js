import React from 'react'
import '../userpost.css'
import { ProfileThumbnail } from '../../ProfileThumbnail/ProfileThumbnail'

const UserComment = ({ props }) => {
    const { username, text } = props
    return (
        <div className="comment-wrapper flex-row">
            <ProfileThumbnail username={username} />
            <p>{text}</p>
        </div>
    )
}

export { UserComment }