import React from 'react'
import dummyface1 from '../../Assets/images/dummyface1.jpg'
import './profilethumbnail.css'

const ProfileLargeThubmnail = () => {
    return (
        <div className='listed-user-profile'>
            <div className="avatar rg">
                <img className="avatar-img" src={dummyface1} alt="profile" />
            </div>
            <div>
                <p>The Rick Ruler</p>
                <p>@evilmorty</p>
            </div>
        </div>
    )
}

export { ProfileLargeThubmnail }