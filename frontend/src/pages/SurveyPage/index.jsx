import React from 'react'
import NavbarAdmin from '../../components/NavbarAdmin'
import QuestionUploadForm from '../../components/QuestionUploadForm'
import s from "./SurveyPage.module.scss"

const SurveyPage = () => {

    return (
        <>
            <NavbarAdmin />
            <div className={s.container}>
                <QuestionUploadForm />
            </div>
        </>
    )
}

export default SurveyPage