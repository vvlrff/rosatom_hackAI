import React, { useState, useEffect } from "react";
import api from "../../api";
import Navbar from "../../components/Navbar";
import BarGraph from "./graphs/BarGraph";
import PieGraph from "./graphs/PieGraph";
import RadialGraph from "./graphs/RadialGraph";
import Popup from "./popup/Popup";
import Loader from "../../components/Loader/Loader";
import { BsFillBarChartLineFill } from "react-icons/bs";
import { AiTwotonePieChart } from "react-icons/ai";
import { GiRadialBalance } from "react-icons/gi";
import s from "./AnalysisPage.module.scss";
import "./graph-master.css";
import "./analysis-master.css";
import axios from "axios";

const AnalysisPage = () => {
    const [allData, setAllData] = useState([]);
    const [expandedItems, setExpandedItems] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [questionData, setQuestionData] = useState([]);
    const [questionIndex, setQuestionIndex] = useState();
    const [soloData, setSoloData] = useState();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("bar");
    const [activeCategory, setActiveCategory] = useState(null);


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

    const handleActiveTab = (question_id) => {
        setActiveTab(question_id);
    };

    const getExcel = (id_question) => {
        setLoading(true);
        axios
            .get(
                `http://localhost:8000/api/questions/output_question?id_question=${id_question}`,
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

    useEffect(() => {
        api.get("/api/questionsall_questions")
            .then((response) => {
                console.log(response.data);
                setAllData(response.data);
                setIsLoading(new Array(response.data.length).fill(false));
                setQuestionData(new Array(response.data.length).fill(null));
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleItemClick = (data, index) => {
        setQuestionIndex(data.questions);
        if (expandedItems.includes(data)) {
            setExpandedItems((prevExpandedItems) =>
                prevExpandedItems.filter((item) => item !== data)
            );
        } else {
            setIsLoading((prevIsLoading) => {
                const updatedIsLoading = [...prevIsLoading];
                updatedIsLoading[index] = true;
                return updatedIsLoading;
            });
            api.get(
                `/api/questionsall_data_questions?id_question=${data.questions}`
            )
                .then((response) => {
                    console.log(response.data);
                    setQuestionData((prevQuestionData) => {
                        const updatedQuestionData = [...prevQuestionData];
                        updatedQuestionData[index] = response.data;
                        return updatedQuestionData;
                    });

                    setIsLoading((prevIsLoading) => {
                        const updatedIsLoading = [...prevIsLoading];
                        updatedIsLoading[index] = false;
                        return updatedIsLoading;
                    });
                    response.data.map((item) => setSoloData(item));
                })
                .catch((error) => {
                    console.error(error);
                    setIsLoading((prevIsLoading) => {
                        const updatedIsLoading = [...prevIsLoading];
                        updatedIsLoading[index] = false;
                        return updatedIsLoading;
                    });
                });
            setExpandedItems((prevExpandedItems) => [
                ...prevExpandedItems,
                data,
            ]);
        }
    };

    return (
        <>
            <Navbar />
            <div className={s.container}>
                {allData.map((data, index) => (
                    <>
                        <div
                            className={`answers ${
                                index !== activeTab
                                    ? "answer_hidden"
                                    : "answer_visible"
                            }`}
                        >
                            <div
                                key={data.questions}
                                className={s.item}
                                onClick={() => {
                                    handleItemClick(data, index);
                                    handleActiveTab(index);
                                }}
                            >
                                {data.id_survey_}
                            </div>
                            {expandedItems.includes(data) && (
                                <div className="answer__details">
                                    {isLoading[index] ? (
                                        <>
                                            <div className="page-mask"></div>
                                            <Loader></Loader>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                className={s.filter__container}
                                            >
                                                {questionData[index].map(
                                                    (question, index) => (
                                                        <div key={index}>
                                                            {/* <h3>
                                                                {
                                                                    question.question
                                                                }
                                                            </h3> */}
                                                            <ul
                                                                className={
                                                                    s.infoList
                                                                }
                                                            >
                                                                {question.answer.map(
                                                                    (
                                                                        answer,
                                                                        answerIndex
                                                                    ) => (
                                                                        <li
                                                                            className={
                                                                                s.infoListItem
                                                                            }
                                                                            key={
                                                                                answerIndex
                                                                            }
                                                                        >
                                                                            <div
                                                                                className={
                                                                                    s.itemCategoryContainer
                                                                                }
                                                                            >
                                                                                <h4
                                                                                    className={
                                                                                        s.itemCategory
                                                                                    }
                                                                                >
                                                                                    Категория{" "}
                                                                                    {
                                                                                        answer.category_namber
                                                                                    }
                                                                                </h4>
                                                                                <h4
                                                                                    className={
                                                                                        s.itemTheme
                                                                                    }
                                                                                >
                                                                                    Тема:{" "}
                                                                                    {
                                                                                        answer.cluster
                                                                                    }
                                                                                </h4>
                                                                            </div>
                                                                            <div>
                                                                                <p
                                                                                    className={
                                                                                        s.itemCount
                                                                                    }
                                                                                >
                                                                                    Количество
                                                                                    ответов:{" "}
                                                                                    {
                                                                                        answer.count
                                                                                    }
                                                                                </p>
                                                                                <div
                                                                                    className={
                                                                                        s.itemSize
                                                                                    }
                                                                                >
                                                                                    <p>
                                                                                        Относительный
                                                                                        размер
                                                                                        кластера:{" "}
                                                                                    </p>
                                                                                    <p
                                                                                        className={
                                                                                            s.itemSizeBlock
                                                                                        }
                                                                                    >
                                                                                        {answer.comparative_size.toFixed(
                                                                                            4
                                                                                        )}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <ul
                                                                                className={
                                                                                    s.listAnswers
                                                                                }
                                                                            >
                                                                                Ответы:
                                                                                {answer.cluster_answers.map(
                                                                                    (
                                                                                        clusterAnswer,
                                                                                        clusterAnswerIndex
                                                                                    ) => (
                                                                                        <li
                                                                                            className={
                                                                                                s.answersItem
                                                                                            }
                                                                                            key={
                                                                                                clusterAnswerIndex
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                clusterAnswer
                                                                                            }
                                                                                        </li>
                                                                                    )
                                                                                )}
                                                                            </ul>
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                            <button
                                                                className={
                                                                    s.buttonDownload
                                                                }
                                                                onClick={() =>
                                                                    getExcel(
                                                                        questionIndex
                                                                    )
                                                                }
                                                            >
                                                                Скачать файл
                                                                ResultPage{" "}
                                                                {questionIndex}{" "}
                                                            </button>
                                                        </div>
                                                    )
                                                )}

                                                <ul className={s.filter__list}>
                                                    <li
                                                        className={
                                                            s.filter__item
                                                        }
                                                        onClick={(e) =>
                                                            handleSelected(
                                                                "bar"
                                                            )
                                                        }
                                                    >
                                                        <BsFillBarChartLineFill />
                                                    </li>
                                                    <li
                                                        className={
                                                            s.filter__item
                                                        }
                                                        onClick={(e) =>
                                                            handleSelected(
                                                                "pie"
                                                            )
                                                        }
                                                    >
                                                        <AiTwotonePieChart />
                                                    </li>
                                                    <li
                                                        className={
                                                            s.filter__item
                                                        }
                                                        onClick={(e) =>
                                                            handleSelected(
                                                                "radial"
                                                            )
                                                        }
                                                    >
                                                        <GiRadialBalance />
                                                    </li>
                                                </ul>
                                            </div>
                                            {!selectedFilter && (
                                                <div
                                                    className={
                                                        s.heightContainer
                                                    }
                                                ></div>
                                            )}
                                            {selectedFilter === "bar" ? (
                                                <div
                                                    className={s.test_container}
                                                >
                                                    <div
                                                        className={
                                                            s.barContainer
                                                        }
                                                    >
                                                        <BarGraph
                                                            className="bar"
                                                            handleClick={
                                                                handleClick
                                                            }
                                                            questionData={
                                                                questionData
                                                            }
                                                            soloData={soloData}
                                                        ></BarGraph>
                                                    </div>
                                                </div>
                                            ) : null}
                                            {selectedFilter === "pie" ? (
                                                <div
                                                    className={s.test_container}
                                                >
                                                    <PieGraph
                                                        handleClick={
                                                            handleClick
                                                        }
                                                        questionData={
                                                            questionData
                                                        }
                                                        soloData={soloData}
                                                    ></PieGraph>
                                                </div>
                                            ) : null}
                                            {selectedFilter === "radial" ? (
                                                <div
                                                    className={s.test_container}
                                                >
                                                    <RadialGraph
                                                        handleClick={
                                                            handleClick
                                                        }
                                                        questionData={
                                                            questionData
                                                        }
                                                        soloData={soloData}
                                                    ></RadialGraph>
                                                </div>
                                            ) : null}
                                            {activeCategory ? (
                                                <Popup
                                                    activeCategory={
                                                        activeCategory
                                                    }
                                                    handleClose={handleClose}
                                                />
                                            ) : null}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                ))}
            </div>
        </>
    );
};

export default AnalysisPage;
