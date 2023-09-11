import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import api from "../../api";
import s from "./ChangeQuestionnairePage.module.scss";

const ChangeQuestionnairePage = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [formData, setFormData] = useState({
        id_survey_: 0,
        questions: "",
        is_closed: false,
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [showForm, setShowForm] = useState(false);

    const handleChange = () => {
        api.put(
            `/api/admin/put_question?id_survey_=${selectedQuestion.id_survey_}&questions=${formData.questions}&is_closed=${formData.is_closed}`
        )
            .then((response) => {
                console.log(response.data);
                setSuccessMessage("Данные успешно обновлены.");
                setShowForm(false);
                alert("Данные успешно обновлены");
            })

            .catch((err) => console.log(err));
    };
    const handleInputChange = () => {
        setFormData((prevState) => ({
            ...prevState,
            is_closed: !prevState.is_closed, // меняем значение на противоположное
        }));
    };
    useEffect(() => {
        api.get("/api/adminall_questions")
            .then((response) => {
                console.log(response.data);
                setQuestions(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const openForm = (question) => {
        setSelectedQuestion(question);
        setFormData({
            id_survey_: question.id_survey_,
            questions: question.questions,
            is_closed: question.is_closed,
        });
        setShowForm(true);
    };

    return (
        <>
            <NavbarAdmin />
            <div className={s.container}>
                <h1
                className={s.title}
                >Изменить вопросы</h1>
                {questions.map((question) => {
                    return (
                        <div className={s.item} key={question.id_survey_}>
                            <div className={s.question}>
                                Вопрос: {question.questions}
                            </div>
                            <div className={s.status}>
                                Статус:{" "}
                                {question.is_closed ? (
                                    <span className={s.closed}>закрыт</span>
                                ) : (
                                    <span className={s.opened}>открыт</span>
                                )}
                            </div>
                            <div className={s.count}>
                                Количество ответов: {question.count}
                            </div>
                            <button
                                className={s.button}
                                onClick={() => openForm(question)}
                            >
                                Изменить вопрос
                            </button>
                            {showForm &&
                                selectedQuestion &&
                                selectedQuestion.id_survey_ ===
                                    question.id_survey_ && (
                                    <div className={s.form}>
                                        <label
                                            htmlFor="questions"
                                            className={s.question}
                                        >
                                            Вопрос:{" "}
                                        </label>
                                        <input
                                            className={s.input}
                                            type="text"
                                            id="questions"
                                            name="questions"
                                            value={formData.questions}
                                            onChange={(e) =>
                                                setFormData((prevState) => ({
                                                    ...prevState,
                                                    questions: e.target.value,
                                                }))}
                                        />

                                        <label
                                            htmlFor="is_closed"
                                            className={s.checkbox}
                                        >
                                            Статус(закрыт):
                                        </label>
                                        <input
                                            type="checkbox"
                                            id="is_closed"
                                            name="is_closed"
                                            className={s.checkboxBlock}
                                            checked={formData.is_closed}
                                            onChange={handleInputChange}
                                        />

                                        <button className={s.buttonSave} onClick={handleChange}>
                                            Сохранить
                                        </button>
                                    </div>
                                )}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ChangeQuestionnairePage;
