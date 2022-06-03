import React from 'react'
import dummyface1 from '../../Assets/images/dummyface1.jpg'
import './profilethumbnail.css'

const ProfileThumbnail = ({ username }) => {
    return (
        <div className='flex-row profile-thubnail-wrapper'>
            <div className="op-avatar avatar sm">
                <img className="avatar-img" src={dummyface1} alt="original poster profile" />
            </div>
            <p className='bold'>{username}</p>
        </div>
    )
}

export { ProfileThumbnail }