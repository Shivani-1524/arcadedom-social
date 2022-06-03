import React, { useState } from 'react'
import { FontAwesomeIcon, faImage } from '../../Assets/icons/icons';
import './createpost.css'
const CreatePost = () => {
    let charLimit = 250
    const [characterLimit, setCharacterLimit] = useState(charLimit);
    const [postInputText, setPostInputText] = useState('');
    const [postDisabled, setPostDisabled] = useState(true);
    const onPostTextChange = (e) => {
        let currentPostText = e.target.value;
        console.log(currentPostText)
        console.log(postDisabled)
        setPostInputText(currentPostText);
        setCharacterLimit(charLimit - currentPostText.length)
        currentPostText.length > charLimit || currentPostText.length === 0 ? setPostDisabled(true) : setPostDisabled(false)
    }
    return (
        <form>
            <div className="post-container">
                <label htmlFor="create_post" className='visually-hidden'>Create Post</label>
                <textarea id="create_post" className='post-input' placeholder='Whats up Arcadian?'
                    value={postInputText}
                    onChange={onPostTextChange}>
                </textarea>
                <div className='flex-row post-media-row'>
                    <div className='flex-row'>
                        <FontAwesomeIcon icon={faImage} />
                        <p>GIF</p>
                    </div>
                    <div className='flex-row'>
                        <p className='violet-txt'>{characterLimit}</p>
                        <button disabled={postDisabled} className={'btn primary-btn cta-btn ' + (postDisabled && ' disabled')}>Post</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export { CreatePost }