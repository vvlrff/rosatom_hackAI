import { useRef } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./popup.css";

const Popup = ({ activeCategory, handleClose }) => {
    const popup = useRef(null);

    const handlePopupClose = (e) => {
        if (
            popup.current &&
            activeCategory &&
            !popup.current.contains(e.target)
        ) {
            handleClose();
        }
    };

    console.log(activeCategory);

    document.addEventListener("mousedown", handlePopupClose);
    return (
        <>
            <div className="page-mask"></div>
            <div className="popup" ref={popup}>
                <button onClick={handleClose} className="popup__button">
                    <AiOutlineCloseCircle />
                </button>
                <p className="popup__category">
                    Категория {activeCategory.name}
                </p>
                <div className="popup__content">
                    <p>Количество слов: {activeCategory.amount}</p>
                    <p>Тема: {activeCategory.text}</p>
                </div>
                <p className="popup__text">Ответы:</p>
                <ul className="popup__list">
                    {activeCategory.allTextData.map((item) => (
                        <li>{item}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Popup;
