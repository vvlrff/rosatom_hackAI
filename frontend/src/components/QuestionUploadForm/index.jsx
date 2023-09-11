import React, { useState } from "react";
import api from "../../api";
import s from "./QuestionUploadForm.module.scss";

const QuestionUploadForm = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile.name);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", file);

        try {
            setIsLoading(true);

            await api.post("/api/admin/upload_file_q", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    );
                    setUploadProgress(progress);
                },
            });
            console.log("Файл успешно загружен");
        } catch (error) {
            console.error("Ошибка при загрузке файла:", error);
        } finally {
            setIsLoading(true);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <input
                type="file"
                onChange={handleFileChange}
                className={s.input}
            />
            <p className={s.p}>Выбранный файл: {fileName}</p>
            {isLoading ? (
                <p className={s.p}>Успешно!</p>
            ) : (
                <>
                    <p className={s.p}>
                        Перетащите свои файлы сюда или щелкните в этой области
                    </p>
                    <button
                        disabled={!file ? "disabled" : null}
                        type="submit"
                        className={s.button}
                    >
                        Загрузить файл
                    </button>
                </>
            )}
        </form>
    );
};

export default QuestionUploadForm;
