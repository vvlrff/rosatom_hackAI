import React from 'react'
import Navbar from '../../components/Navbar'
import s from "./NotFoundPage.module.scss"

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <div className={s.container}>
        Страница не найдена
      </div>
    </>
  )
}

export default NotFoundPage