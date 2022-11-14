import ReactDom from "react-dom"
// import { commonModalTitleClasses } from "../../utils/theme";

export const commonModalTitleClasses = "dark:text-white text-primary text-2xl font-semibold text-center mb-5 "


export const Backdrop = props => {
    const handleClick = () => {
        if (props.onClose) {
            props.onClose();
        }
    }
    return (
        <div onClick={handleClick} className="modal-overlay"></div>
    )
}

const Modal = ({ onClose, children, style, title = '' }) => {
    return (
        <>
            {
                ReactDom.createPortal(
                    <>
                        <Backdrop onClose={onClose} />
                        <div className={"modal rounded bg-white " + style}>
                            <div className="w-full h-14 bg-highlight p-3 rounded flex justify-between">
                                <div className="w-full text-center">
                                    <span className={commonModalTitleClasses}>{title}</span>
                                </div>
                                <div className="float-right">
                                    <button type="close" className="text-white text-xl" onClick={onClose}>X</button>
                                </div>
                            </div>
                            <div className="modal-content custom-scroll-bar overflow-auto ">{children}</div>
                        </div>
                    </>,
                    document.getElementById("modal-root")
                )
            }
        </>
    )
}
export default Modal;