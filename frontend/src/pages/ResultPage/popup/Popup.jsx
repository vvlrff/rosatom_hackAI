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
                <p className="popup__category">Тема: {activeCategory.name}</p>
                {/* <p>Индекс кластера: {activeCategory.category_nгmber}</p> */}
                <p className="popup__content">
                    Количество ответов: {activeCategory.amount}
                </p>
                {/* <p>Относительный размер: {activeCategory.comparative_size}</p> */}
                <ul>
                    <p className="popup__list-text">Ответы: </p>
                    {activeCategory.allTextData.map((item) => (
                        <p className="popup__text">{item}</p>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Popup;
