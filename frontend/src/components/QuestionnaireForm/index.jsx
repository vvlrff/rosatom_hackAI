import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    ArrowForward,
    ArrowRight,
} from "../VideoSection/VideoElements";
import api from "../../api";
import s from "./QuestionnaireForm.module.scss";
import { BsArrowRight } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import gif from "../../assets/video/ezgif.com-optimize.gif";

const QuestionnaireForm = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
    };

    useEffect(() => {
        api.get("/api/questionsquestions")
            .then((response) => {
                console.log(response.data);
                setQuestions(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleAnswerSubmit = () => {
        if (currentQuestionIndex <= questions.length - 1) {
            api.post(
                `/api/questionspost_questions?id_question=${questions[currentQuestionIndex].id}&user_answer=${userAnswer}`
            )
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserAnswer("");
        } else {
            setSubmitted(true);
        }
    };

    const handleInputChange = (event) => {
        setUserAnswer(event.target.value);
    };

    const navigate = useNavigate();

    return (
        <>
            {/* <img src={gif} alt="#" /> */}

            <form>
                {currentQuestionIndex < questions.length && !submitted ? (
                    <div className={s.item}>
                        <div className={s.count}>
                            {currentQuestionIndex + 1} вопрос из{" "}
                            {questions.length}
                        </div>
                        <div className={s.question_title}>
                            {questions[currentQuestionIndex].question}
                        </div>
                        <input
                            className={s.input}
                            value={userAnswer}
                            onChange={handleInputChange}
                        />
                        <button
                            type="button"
                            onClick={handleAnswerSubmit}
                            className={s.button}
                        >
                            <p>
                                Отправить ответ <BsArrowRight></BsArrowRight>
                            </p>
                        </button>
                    </div>
                ) : (
                    <div className={s.end}>
                        <div className={s.end_text}>Спасибо за ответы!</div>
                        <div className={s.home} onClick={() => navigate("/")}>
                            <AiFillHome></AiFillHome>
                        </div>
                        {/* <Button to='/analysis' onMouseEnter={onHover} onMouseLeave={onHover}>
                        Проанализировать ответы {hover ? <ArrowForward /> : <ArrowRight />}
                    </Button> */}
                    </div>
                )}
            </form>
        </>
    );
};

export default QuestionnaireForm;
