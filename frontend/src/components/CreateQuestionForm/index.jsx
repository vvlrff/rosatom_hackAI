import React, { useState, useEffect } from "react";
import api from "../../api";
import s from "./CreateQuestionForm.module.scss";

const CreateQuestionForm = () => {
    const [questions, setQuestions] = useState("");
    const [created, setCreated] = useState(false);

    const handleAnswerSubmit = async (event) => {
        event.preventDefault();
        console.log(questions);
        api.post(`/api/admin/post_question?questions=${questions}`)
            .then((response) => {
                console.log(response.data);
                setCreated(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleErase = () => {
        if (created) {
            setQuestions("");
            setTimeout(() => {
                setCreated(false);
            }, 1500);
        }
    };

    useEffect(() => {
        handleErase();
    }, [created]);

    return (
        <form className={s.container} onSubmit={handleAnswerSubmit}>
            <h2 className={s.title}>Создать вопрос</h2>
            <input
                type="text"
                value={questions}
                className={s.input}
                onChange={(e) => setQuestions(e.target.value)}
            />
            {created ? (
                <div className={s.created}>Вопрос успешно создан</div>
            ) : null}
            <button type="submit" className={s.button}>
                Создать вопрос
            </button>
        </form>
    );
};

export default CreateQuestionForm;
