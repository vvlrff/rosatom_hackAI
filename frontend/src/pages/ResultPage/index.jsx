import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavbarAdmin from "../../components/NavbarAdmin";
import BarGraph from "./graphs/BarGraph";
import PieGraph from "./graphs/PieGraph";
import RadialGraph from "./graphs/RadialGraph";
import Popup from "./popup/Popup";
import s from "./ResultPage.module.scss";
import "./graph-master.css";
import axios from "axios";

import { BsFillBarChartLineFill } from "react-icons/bs";
import { AiTwotonePieChart } from "react-icons/ai";
import { GiRadialBalance } from "react-icons/gi";

const ResultPage = () => {
    const [selectedFilter, setSelectedFilter] = useState("bar");
    const [activeCategory, setActiveCategory] = useState(null);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const objectIndex = 0;
    const { state } = location;

    console.log("state.response[objectIndex]", state.response[objectIndex]);
    console.log("state.response", state.response);

    const handleClick = (obj) => {
        setActiveCategory(obj);
    };

    const handleClose = () => {
        setActiveCategory((prev) => !prev);
    };

    const handleSelected = (option) => {
        handleDisable();
        setSelectedFilter(option);
    };

    const handleDisable = () => {
        setSelectedFilter(null);
    };
    const getExcel = (id_question) => {
        setLoading(true);
        axios
            .post(
                `http://localhost:8000/api/download?file=${id_question}`,
                null,
                {
                    responseType: "blob", // Указываем, что ожидаем blob (бинарные данные) в ответе
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    // Создаем ссылку на blob и имитируем клик на ней для скачивания файла
                    const url = window.URL.createObjectURL(
                        new Blob([res.data])
                    );
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", id_question + ".csv"); // Установите желаемое имя файла
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(url); // Очистите ресурсы
                    setLoading(false);
                }
            })
            .catch((err) => {
                alert(err);
                setLoading(false);
            });
    };

    return (
        <>
            <NavbarAdmin />

            {/* {
                Object.entries(state.response)
                    .map(([key, value]) => (
                        <div key={key}>
                            <div>
                                {key}: {value}
                            </div >
                        </div>
                    ))
            } */}
            {state.response.map((question, index) => (
                <div className={s.container} key={index}>
                    <h3
                    className={s.title}
                    >Вопрос: {question.question}</h3>
                    <ul className={s.resultList}>
                        {question.answer.map((answer, answerIndex) => (
                            <li className={s.resultItem} key={answerIndex}>
                                <h4 className={s.itemTheme}>
                                    Тема: {answer.cluster}
                                </h4>
                                <p className={s.count}>
                                    Количество ответов: {answer.count}
                                </p>
                                <ul className={s.answerList}>
                                    Ответы:
                                    {answer.cluster_answers.map(
                                        (clusterAnswer, clusterAnswerIndex) => (
                                            <li
                                                className={s.answers}
                                                key={clusterAnswerIndex}
                                            >
                                                {clusterAnswer}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </li>
                        ))}
                    </ul>
                    <button 
                    className={s.buttonDownload}
                    onClick={() => getExcel(question.question_id)}>
                        Скачать файл ResultPage {question.question_id}{" "}
                    </button>
                    {/*  */}
                </div>
            ))}
            <ul className={s.filter__list}>
                <li
                    className={s.filter__item}
                    onClick={(e) => handleSelected("bar")}
                >
                    <BsFillBarChartLineFill />
                </li>
                <li
                    className={s.filter__item}
                    onClick={(e) => handleSelected("pie")}
                >
                    <AiTwotonePieChart />
                </li>
                <li
                    className={s.filter__item}
                    onClick={(e) => handleSelected("radial")}
                >
                    <GiRadialBalance />
                </li>
            </ul>

            {!selectedFilter && <div className={s.sda}></div>}
            {selectedFilter === "bar" ? (
                <div className={s.test_container}>
                    <div className={s.barContainer}>
                        <BarGraph
                            className="bar"
                            handleClick={handleClick}
                            dataJSON={state.response[objectIndex]}
                        ></BarGraph>
                    </div>
                </div>
            ) : null}
            {selectedFilter === "pie" ? (
                <div className={s.test_container}>
                    <PieGraph
                        handleClick={handleClick}
                        dataJSON={state.response[objectIndex]}
                    ></PieGraph>
                </div>
            ) : null}
            {selectedFilter === "radial" ? (
                <div className={s.test_container}>
                    <RadialGraph
                        handleClick={handleClick}
                        dataJSON={state.response[objectIndex]}
                    ></RadialGraph>
                </div>
            ) : null}
            {activeCategory ? (
                <Popup
                    activeCategory={activeCategory}
                    handleClose={handleClose}
                />
            ) : null}
        </>
    );
};

export default ResultPage;
