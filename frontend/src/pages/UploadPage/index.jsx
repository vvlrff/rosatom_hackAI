import React from 'react'
import NavbarAdmin from '../../components/NavbarAdmin'
import FileUploadForm from '../../components/FileUploadForm'
import s from "./UploadPage.module.scss"

const UploadPage = () => {
  return (
    <>
      <NavbarAdmin />
      <div className={s.container}>
        <FileUploadForm />
      </div>
    </>
  )
}

export default UploadPage;