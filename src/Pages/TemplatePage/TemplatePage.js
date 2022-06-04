import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideSection, Navbar } from "../../Components/index"
import "./templatepage.css"
import { CreatePost } from '../../Components/CreatePost/CreatePost'
import { ModalComponent } from '../../Components/ModalComponent/ModalComponent'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

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
            <div className="outlet-container">
                <Outlet />
            </div>
        </div>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}

export { TemplatePage }