import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideSection, Navbar } from "../../Components/index"
import "./templatepage.css"
import { CreatePost } from '../../Components/CreatePost/CreatePost'
import { GiphyPicker } from '../../Components/CreatePost/GiphyPicker/GiphyPicker'
import { ModalComponent } from '../../Components/ModalComponent/ModalComponent'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { UserModalList } from '../../Components/UserModalList/UserModalList'


const TemplatePage = () => {
    const modal = useSelector((state) => state.modal.value)
    const auth = useSelector((state) => state.auth)
    const location = useLocation()
    return auth.authToken ? (
        <div className="page-layout">
            <Navbar />
            <SideSection />
            {modal.display && modal.type === 'createpost' && <ModalComponent>
                <CreatePost />
            </ModalComponent>}
            {modal.display && modal.type === 'userlist' && <ModalComponent>
                <UserModalList listType={modal.type} />
            </ModalComponent>}
            {modal.display && modal.type === 'selectgif' && <ModalComponent>
                <GiphyPicker type="editPost" />
            </ModalComponent>}
            <div className="outlet-container">
                <Outlet />
            </div>
        </div>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}

export { TemplatePage }