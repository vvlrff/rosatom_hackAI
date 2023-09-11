import React from 'react';
import Navbar from '../../components/Navbar';
import QuestionnaireForm from '../../components/QuestionnaireForm';
import s from "./QuestionnairePage.module.scss";

const QuestionnairePage = () => {
    return (
        <>
            <Navbar />
            <div className={s.container}>
                <div className={s.title}>
                    Анкетирование
                </div>
                <QuestionnaireForm />
            </div>
        </>
    )
}

export default QuestionnairePage;