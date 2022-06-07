import React from 'react'
import './giphypicker.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { gifSelection } from '../../../Features/postsSlice'
import { hideModal } from '../../../Features/modalSlice'

const GiphyPicker = ({ selectGif, type }) => {
    const dispatch = useDispatch()
    const gifApiKey = process.env.REACT_APP_GIPHY_API_KEY;
    const gifLimit = 6;
    const trendUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${gifApiKey}&limit=${gifLimit}`;
    const [gifList, setGifList] = useState([]);
    console.log(type)
    const getSearchGifs = (e) => {
        const searchString = e.target.value
        if (e.target.value == '') {
            getTrendingGifs()
        } else {
            const queryParams = { q: searchString, limit: gifLimit }
            const queryString = new URLSearchParams(queryParams).toString()
            const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${gifApiKey}&lang=en&` + queryString;
            fetch(searchUrl)
                .then((res) => res.json())
                .then(({ data }) =>
                    setGifList(data))
                .catch((err) => {
                    console.error(err)
                })
        }
        console.log(gifList)
    }

    const getTrendingGifs = () => {
        fetch(trendUrl)
            .then((res) => res.json())
            .then(({ data }) => {
                console.log(data)
                setGifList(data);
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        getTrendingGifs()
    }, [])

    return (
        <div className='giphy-picker-wrapper'>
            <input type="text" onChange={getSearchGifs} placeholder='Search GIPHY' />
            <div className="gifs-grid flex-row">
                {gifList.length > 0 ?
                    gifList.map((gif) => <img key={gif.id} onClick={() => {
                        if (type === 'editPost') {
                            dispatch(gifSelection(gif.images.downsized.url))
                            dispatch(hideModal())
                        } else {
                            selectGif(gif.images.downsized.url)
                        }
                    }} className="img-resp gif-size pointer" src={gif.images.fixed_height_downsampled.url} alt="gif" />) : <p>Loading GIFs...</p>}
            </div>
        </div>
    )
}

export { GiphyPicker }