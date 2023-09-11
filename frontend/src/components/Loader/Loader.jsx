import "./loader.css";

const Loader = () => {
    return (
        <>
            <div className="center">
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    );
};

export default Loader;
