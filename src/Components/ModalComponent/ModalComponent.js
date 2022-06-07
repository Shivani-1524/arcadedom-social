import React from 'react'
import './modalcomponent.css'
import { FontAwesomeIcon, faClose } from '../../Assets/icons/icons';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../Features/modalSlice';

const ModalComponent = (props) => {
    console.log(props.type)
    const dispatch = useDispatch()
    const handleHideModal = () => {
        props.type === 'gifpick' ? props.hideGifToggle() : dispatch(hideModal())
    }
    return (
        <div className='modal-bg center-items'>
            <div className='modal-component-wrapper'>
                <div className='pos-rel'>
                    <FontAwesomeIcon onClick={handleHideModal} icon={faClose} className="pos-abs close-icon" />
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export { ModalComponent }