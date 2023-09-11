import React from 'react'
import NavbarAdmin from '../../components/NavbarAdmin'
import CreateQuestionForm from '../../components/CreateQuestionForm'
import s from "./CreateQuestionPage.module.scss"

const CreateQuestionPage = () => {
    return (
        <>
            <NavbarAdmin />
            <div className={s.container}>
                <CreateQuestionForm />
            </div>
        </>
    )
}

export default CreateQuestionPage