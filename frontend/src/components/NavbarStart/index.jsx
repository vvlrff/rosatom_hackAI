import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";
import { Nav } from "./NavbarElements";
import s from "./Navbar.module.scss";

const NavbarStart = () => {
    const [scrollNav, setScrollNav] = useState(false);

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", changeNav);
    }, []);

    const toggleHome = () => {
        scroll.scrollToTop();
    };

    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <Nav scrollNav={scrollNav}>
                    <div className={s.container}>
                        <LinkR className={s.logo} to="/" onClick={toggleHome}>
                            NaturaLP
                        </LinkR>

                        <ul className={s.menu}>
                            <li className={s.item}>
                                <LinkS
                                    to="1"
                                    className={s.links}
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact="true"
                                    offset={-80}
                                >
                                    Краткое описание
                                </LinkS>
                            </li>
                            <li className={s.item}>
                                <LinkS
                                    to="2"
                                    className={s.links}
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact="true"
                                    offset={-80}
                                >
                                    Используемые технологии
                                </LinkS>
                            </li>
                            <li className={s.item}>
                                <LinkS
                                    to="3"
                                    className={s.links}
                                    smooth={true}
                                    duration={500}
                                    spy={true}
                                    exact="true"
                                    offset={-80}
                                >
                                    Технические особенности
                                </LinkS>
                            </li>
                        </ul>
                    </div>
                </Nav>
            </IconContext.Provider>
        </>
    );
};

export default NavbarStart;
