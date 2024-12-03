import style from "./button.module.scss"

const ClearButton = ({ children, func, type = "button" }) => {
    return (
        <button className={style.ClearButton} onClick={func} type={type}> {children} </button>
    )
}

export default ClearButton
