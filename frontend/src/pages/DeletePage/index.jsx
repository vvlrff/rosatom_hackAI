import React from 'react'
import NavbarAdmin from '../../components/NavbarAdmin'
import DeleteForm from '../../components/DeleteForm'
import s from "./DeletePage.module.scss"

const DeletePage = () => {
    return (
        <>
            <NavbarAdmin />
            <div className={s.container}>
                <DeleteForm />
            </div>
        </>
    )
}

export default DeletePage