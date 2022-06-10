import React from 'react';
import { NavLink, Link } from "react-router-dom"
import NavLogo from '../../Assets/images/nav-logo.png'
import './navbar.css'
import { faCompass, faBookmark, faPlus, FontAwesomeIcon, faRightFromBracket, faHouseChimneyCrack, faBars, faCircleUser } from '../../Assets/icons/icons'
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../Features/modalSlice';
import { userLogout } from '../../Features/authSlice';

const Navbar = () => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.auth)
    const { username } = JSON.parse(currentUser)
    const activeStyle = (isActive) => (isActive ? 'navicon-link active-link' : 'navicon-link')
    return (
        <nav className="navbar" >
            <div className="nav-logo">
                <img src={NavLogo} alt="arcade logo" />
            </div>
            <div className="nav-items">
                <Link to="/" className="nav-link sm-title hide-md">ArcadeDom</Link>
            </div>
            <div className="nav-space"></div>
            <div className="nav-icon-items">
                <FontAwesomeIcon onClick={() => dispatch(showModal({ type: 'createpost' }))} icon={faPlus} className="btn icon-btn hide-md dark-bg-icon" />
                <NavLink to="/" className={({ isActive }) => activeStyle(isActive)}>
                    <FontAwesomeIcon icon={faHouseChimneyCrack} className="btn icon-btn hide-md dark-bg-icon" />
                </NavLink>
                <NavLink to="/explore" className={({ isActive }) => activeStyle(isActive)}>
                    <FontAwesomeIcon icon={faCompass} className="btn icon-btn hide-md dark-bg-icon" />
                </NavLink>
                <NavLink to="/bookmarks" className={({ isActive }) => activeStyle(isActive)}>
                    <FontAwesomeIcon icon={faBookmark} className="btn icon-btn hide-md dark-bg-icon" />
                </NavLink>
                <NavLink to={`/profile/${username}`} className={({ isActive }) => activeStyle(isActive)}>
                    <FontAwesomeIcon icon={faCircleUser} className="btn icon-btn hide-md dark-bg-icon" />
                </NavLink>
                <NavLink to="/logout" className={({ isActive }) => activeStyle(isActive)}>
                    <FontAwesomeIcon onClick={() => dispatch(userLogout())} icon={faRightFromBracket} className="btn icon-btn hide-md dark-bg-icon" />
                </NavLink>
                <FontAwesomeIcon icon={faBars} className="btn icon-btn show-md dark-bg-icon" />
            </div>
        </nav>
    )
}

export { Navbar }