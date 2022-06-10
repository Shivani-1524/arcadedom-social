import React, { useState, useEffect } from 'react'
import './editprofile.css'
import dummyImg from '../../../../Assets/images/dummyface1.jpg'
import { FontAwesomeIcon, faPlus } from '../../../../Assets/icons/icons'
import { useDispatch } from 'react-redux'
import { editUserData } from '../../../../Features/usersSlice'

const EditProfile = ({ props, hideModalToggle }) => {
    const { username, avatarURL, bio, bioLink, firstName, lastName } = props
    const [editProfileInput, setEditProfileInput] = useState({});
    const [editProfileImg, setEditProfileImg] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        setEditProfileInput({ ...props })
    }, []);

    const updateProfile = () => {
        if (editProfileImg) {
            const cloudinaryPreset = process.env.REACT_APP_CLOUDINARY_KEY;
            const formData = new FormData()
            formData.append("file", editProfileImg)
            formData.append("upload_preset", cloudinaryPreset)
            fetch('https://api.cloudinary.com/v1_1/ds9sho1ch/image/upload',
                { method: "POST", body: formData })
                .then((res) => res.json())
                .then((json) => {
                    dispatch(editUserData({ userData: { ...editProfileInput, avatarURL: json.url } }))
                    hideModalToggle()
                })
        } else {
            dispatch(editUserData({ userData: editProfileInput }))
            hideModalToggle()
        }
    }
    return (
        <div className='edit-profile-wrapper flex-col'>
            <b className='mg-t-20 light-grey-txt'>Edit Your Details</b>
            <div className=''>
                <p>Profile Picture:</p>
                <div className='flex-row align-start-row'>
                    <div class="avatar md mg-t-5">
                        {editProfileImg ? <img src={URL.createObjectURL(new Blob([editProfileImg], { type: "application/zip" }))} alt="new profile" /> : <img class="avatar-img" src={avatarURL ? avatarURL : dummyImg} alt="avatar" />}
                    </div>
                    <label htmlFor="profile-img" className='pointer user-stat'>
                        Upload Picture <FontAwesomeIcon icon={faPlus} />
                    </label>
                    <input value="" className='visually-hidden' id="profile-img" type="file"
                        onChange={(e) => {
                            setEditProfileImg(e.target.files[0])
                        }} accept="image/*" />
                </div>
            </div>
            <div className='flex-row'>
                <span>Name:</span>
                <span className='light-grey-txt'>{firstName + ' ' + lastName}</span>
            </div>
            <div className='flex-row'>
                <span>Username:</span>
                <span className='light-grey-txt'>@{username}</span>
            </div>
            <div className='flex-col profile-input'>
                <label htmlFor="profile-bio">Bio:</label>
                <input onChange={(e) => { setEditProfileInput(prev => ({ ...prev, bio: e.target.value })) }} className='profile-txt' type="text" id="profile-bio" defaultValue={bio} />
            </div>
            <div className='flex-col profile-input'>
                <label htmlFor="profile-link">Bio Link:</label>
                <input onChange={(e) => { setEditProfileInput(prev => ({ ...prev, bioLink: e.target.value })) }} className='profile-txt' type="text" id="profile-link" defaultValue={bioLink} />
            </div>
            <button className='btn primary-btn solid cta-btn align-right' onClick={updateProfile}>Save</button>
        </div>
    )
}

export { EditProfile }