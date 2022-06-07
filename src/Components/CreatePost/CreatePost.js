import React, { useState } from 'react'
import { FontAwesomeIcon, faImage, faCircleXmark } from '../../Assets/icons/icons';
import './createpost.css'
import { GiphyPicker } from './GiphyPicker/GiphyPicker';
import { ModalComponent } from '../ModalComponent/ModalComponent';
import { useDispatch } from 'react-redux';
import { createPost } from '../../Features/postsSlice';

const CreatePost = () => {
    const dispatch = useDispatch()
    let charLimit = 250
    const [characterLimit, setCharacterLimit] = useState(charLimit);
    const [postContent, setPostContent] = useState({ content: '', postMedia: '' });
    const [postDisabled, setPostDisabled] = useState(true);
    const [gifSelected, setGifSelected] = useState(null);
    const [toggleGifPicker, setToggleGifPicker] = useState(false);

    const onPostTextChange = (e) => {
        let currentPostText = e.target.value;
        setPostContent(prev => ({ ...prev, content: currentPostText }));
        setCharacterLimit(charLimit - currentPostText.length)
        currentPostText.length >= charLimit || currentPostText.length > 0 ? setPostDisabled(false) : setPostDisabled(true)
    }
    const uploadPost = (e) => {
        e.preventDefault();
        if (postContent.postMedia !== '') {
            const cloudinaryPreset = process.env.REACT_APP_CLOUDINARY_KEY;
            const formData = new FormData()
            formData.append("file", postContent.postMedia)
            formData.append("upload_preset", cloudinaryPreset)
            fetch('https://api.cloudinary.com/v1_1/ds9sho1ch/image/upload',
                { method: "POST", body: formData })
                .then((res) => res.json())
                .then((json) => {
                    dispatch(createPost({ postData: { content: postContent.content, postImage: json.url } }))
                    setPostDisabled(true)
                    setPostContent({ content: '', postMedia: '' })
                    setGifSelected(null)
                })
        } else {
            dispatch(createPost({ postData: { content: postContent.content, postImage: gifSelected } }))
            setPostDisabled(true)
            setPostContent({ content: '', postMedia: '' })
            setGifSelected(null)
        }
    }
    return (
        <form>
            <div className="post-container">
                <label htmlFor="create_post" className='visually-hidden'>Create Post</label>
                <textarea id="create_post" className='post-input' placeholder='Whats up Arcadian?'
                    value={postContent.content}
                    onChange={onPostTextChange}>
                </textarea>
                {(postContent.postMedia || gifSelected) && <div className='pos-rel'>
                    <FontAwesomeIcon onClick={() => {
                        setPostContent(prev => ({ ...prev, postMedia: '' }))
                        setGifSelected(null)
                        postContent.content !== '' && setPostDisabled(true)
                    }} className='pos-abs pointer close-icon-img' icon={faCircleXmark} />
                    {gifSelected ? <img className='img-resp img-preview' src={gifSelected} alt="post preview" /> :
                        <img className='img-resp img-preview'
                            src={URL.createObjectURL(new Blob([postContent.postMedia], { type: "application/zip" }))} alt="post preview" />}
                </div>}
                <div className='flex-row post-media-row'>
                    <div className='flex-row'>
                        <div className='image-upload-wrapper'>
                            <label htmlFor="upload-img">
                                <FontAwesomeIcon className="pointer" icon={faImage} />
                            </label>
                            {/* value="" forces file to change everytime */}
                            <input value="" className='visually-hidden' id="upload-img" type="file"
                                onChange={(e) => {
                                    setPostDisabled(false)
                                    setPostContent(prev => ({ ...prev, postMedia: e.target.files[0] }))
                                    setGifSelected(null)
                                }} accept="image/*" />
                        </div>
                        <p className='pointer' onClick={() => { setToggleGifPicker(true) }}>GIF</p>
                    </div>
                    <div className='flex-row'>
                        <p className='violet-txt'>{characterLimit}</p>
                        <button onClick={uploadPost} disabled={postDisabled} className={'btn primary-btn cta-btn ' + (postDisabled && ' disabled')}>Post</button>
                    </div>
                </div>
            </div>
            {toggleGifPicker && <ModalComponent type="gifpick" hideGifToggle={() => setToggleGifPicker(false)}>
                <GiphyPicker selectGif={(url) => {
                    setPostDisabled(false)
                    setPostContent(prev => ({ ...prev, postMedia: '' }))
                    setGifSelected(url)
                    setToggleGifPicker(false)
                }} />
            </ModalComponent>}

        </form>
    )
}

export { CreatePost }