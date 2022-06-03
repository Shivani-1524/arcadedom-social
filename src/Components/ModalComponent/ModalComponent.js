import React from 'react'
import './modalcomponent.css'
import { FontAwesomeIcon, faClose } from '../../Assets/icons/icons';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../Features/modalSlice';

const ModalComponent = ({ children }) => {
    const dispatch = useDispatch()
    return (
        <div className='modal-bg center-items'>
            <div className='modal-component-wrapper'>
                <div className='pos-rel'>
                    <FontAwesomeIcon onClick={() => dispatch(hideModal())} icon={faClose} className="pos-abs close-icon" />
                    {children}
                </div>
            </div>
        </div>
    )
}

export { ModalComponent }