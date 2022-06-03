import React from 'react'
import { FontAwesomeIcon, faEdit, faTrash } from '../../../Assets/icons/icons'
const PostDrawer = ({ hideDrawer }) => {
    return (
        <div className='postdrawer-wrapper flex-col center-items pos-abs'>
            <div className='flex-row drawer-btn'>
                <p className='drawer-action edit-btn'>Edit</p>
                <FontAwesomeIcon className='drawer-icon' icon={faEdit} />
            </div>
            <div className='flex-row drawer-btn'>
                <p className='drawer-action delete-btn'>Delete</p>
                <FontAwesomeIcon className='drawer-icon' icon={faTrash} />
            </div>
        </div>
    )
}

export { PostDrawer }