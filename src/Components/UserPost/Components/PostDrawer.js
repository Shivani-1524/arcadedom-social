import React, { useRef } from 'react'
import { FontAwesomeIcon, faEdit, faTrash } from '../../../Assets/icons/icons'
import { useOutsideClick } from '../../../Utils/useOutsideClick'

const PostDrawer = ({ hideDrawer, enableEditPost }) => {
    console.log(enableEditPost)
    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef, hideDrawer)
    return (
        <div ref={wrapperRef} className='postdrawer-wrapper flex-col center-items pos-abs'>
            <div onClick={() => {
                hideDrawer()
                enableEditPost()
            }} className='flex-row drawer-btn'>
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