import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavbarAdmin from "../../components/NavbarAdmin";
import s from "./RedirectPage.module.scss";
import "./anim.css";

const RedirectPage = () => {
    const [text, setText] = useState("Нажмите необходимую кнопку");

    return (
        <>
            <NavbarAdmin />
            <div className={s.black}>
                <p className={s.title}>Панель администратора</p>
                <div className={s.container}>
                    <div className={s.separatorLeft}>
                        <Link
                            className={s.link}
                            to="upload"
                            onMouseEnter={() => setText("Загрузить файл JSON")}
                        >
                            Загрузить файл JSON
                        </Link>
                        <Link
                            className={s.link}
                            to="analysis"
                            onMouseEnter={() => setText("Анализ вопросов")}
                        >
                            Анализ вопросов
                        </Link>
                        <Link
                            className={s.link}
                            to="survey"
                            onMouseEnter={() =>
                                setText("Загрузить csv-файл с вопросами")
                            }
                        >
                            Загрузить csv-файл с вопросами
                        </Link>
                        <Link
                            className={s.link}
                            to="change"
                            onMouseEnter={() => setText("Изменить вопросы")}
                        >
                            Изменить вопросы
                        </Link>
                        <Link
                            className={s.link}
                            to="create"
                            onMouseEnter={() => setText("Создать вопрос")}
                        >
                            Создать вопрос
                        </Link>
                        <Link
                            className={s.link}
                            to="delete"
                            onMouseEnter={() => setText("Удалить вопрос")}
                        >
                            Удалить вопрос
                        </Link>
                    </div>
                    <div className={s.separatorRight}>
                        {text && (
                            <p className="anim_typewriter line1">{text}</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RedirectPage;
