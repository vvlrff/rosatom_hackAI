import React from 'react';
import { IconContext } from 'react-icons/lib';
import { Link as LinkR } from 'react-router-dom';
import { Nav } from './NavbarElements';
import s from "./Navbar.module.scss"


const NavbarAdmin = () => {
    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Nav>
                    <div className={s.container}>
                        <LinkR className={s.logo} to='/admin'>NaturaLP</LinkR>
                    </div>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default NavbarAdmin