import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideSection, Navbar } from "../../Components/index"
import "./templatepage.css"
import { CreatePost } from '../../Components/CreatePost/CreatePost'
import { ModalComponent } from '../../Components/ModalComponent/ModalComponent'
import { useSelector } from 'react-redux'

const TemplatePage = () => {
    const modal = useSelector((state) => state.modal.value)
    return (
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
    )
}

export { TemplatePage }