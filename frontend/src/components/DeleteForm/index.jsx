import React, { useState, useEffect } from "react";
import api from "../../api";
import s from "./DeleteForm.module.scss";

const DeleteForm = () => {
    const [questions, setQuestions] = useState(0);
    const [deleted, setDeleted] = useState(false);

    const handleAnswerSubmit = async (event) => {
        event.preventDefault();
        console.log(questions);
        api.delete(`/api/admin/put_question_del?id_survey_=${questions}`)
            .then((response) => {
                console.log(response.data);
                setDeleted(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleErase = () => {
        if (deleted) {
            setQuestions("");
            setTimeout(() => {
                setDeleted(false);
            }, 1500);
        }
    };

    useEffect(() => {
        handleErase();
    }, [deleted]);

    return (
        <form className={s.container} onSubmit={handleAnswerSubmit}>
            <h2 className={s.title}>Удалить вопрос</h2>
            <input
                type="number"
                value={questions}
                className={s.input}
                onChange={(e) => setQuestions(e.target.value)}
            />
            {deleted ? (
                <div className={s.deleted}>Вопрос успешно удален</div>
            ) : null}
            <button type="submit" className={s.button}>
                Удалить вопрос
            </button>
        </form>
    );
};

export default DeleteForm;
