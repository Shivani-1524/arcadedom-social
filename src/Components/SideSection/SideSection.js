import React from 'react'
import { useLocation } from 'react-router-dom';
import "./sidesection.css";
import { FontAwesomeIcon, faSearch } from '../../Assets/icons/icons';
import dummyface1 from '../../Assets/images/dummyface1.jpg'
import { useDispatch } from 'react-redux';
import { sortPosts } from '../../Features/postsSlice';

const SideSection = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const currentRoute = location.pathname
    const handlePostSort = (e) => {
        dispatch(sortPosts(e.target.value))
    }
    return (
        <aside className="filters-container light-txt">
            {currentRoute === '/' && <div className='sort-container flex-row'>
                <p>Sort Posts</p>
                <select className='sort-dropdown' onChange={handlePostSort} name="sort posts">
                    <option value="newest">Newest</option>
                    <option value="trending">Trending</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>}
            <div className="nav-search-bar hide-sm">
                <input className="search-bar" type="text" placeholder="Search ..." />
                <FontAwesomeIcon icon={faSearch} className="nav-search" />
            </div>
            <p>Suggested Users</p>
            <div className='user-listing flex-col'>
                <div className='listed-user-profile'>
                    <div className="avatar rg">
                        <img className="avatar-img" src={dummyface1} alt="profile" />
                    </div>
                    <div>
                        <p>The Rick Ruler</p>
                        <p>@evilmorty</p>
                    </div>
                </div>
                <div className='listed-user-profile'>
                    <div className="avatar rg">
                        <img className="avatar-img" src={dummyface1} alt="profile" />
                    </div>
                    <div>
                        <p>The Rick Ruler</p>
                        <p>@evilmorty</p>
                    </div>
                </div>
                <div className='listed-user-profile'>
                    <div className="avatar rg">
                        <img className="avatar-img" src={dummyface1} alt="profile" />
                    </div>
                    <div>
                        <p>The Rick Ruler</p>
                        <p>@evilmorty</p>
                    </div>
                </div>

            </div>

        </aside>
    )
}

export { SideSection }