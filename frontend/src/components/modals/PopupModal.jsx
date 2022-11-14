import React, { useState } from 'react'
import { useNotification } from '../../hooks'
import ReactDom from "react-dom"
import { commonModalButtonClasses, commonModalTitleClasses } from '../../utils/theme'


export const Backdrop = props => {
    const handleClick = () => {
        if (props.onClose) {
            props.onClose();
        }
    }
    return (
        <div onClick={handleClick} className="second-modal-overlay"></div>
    )
}

export const SecondaryModal = ({ onClose, children, width = "w-[35rem] ", style = '', hideClose = false }) => {
    return (
        <>
            {
                ReactDom.createPortal(
                    <>
                        <Backdrop onClose={onClose} />
                        <div className={width + "second-modal dark:bg-primary bg-white" + style}>
                            {
                                !hideClose &&
                                <div className="float-right">
                                    <button type="close" className="dark:text-white text-primary text-xl" onClick={onClose}>X</button>
                                </div>
                            }
                            <div className="content overflow-auto custom-scroll-bar">{children}</div>
                        </div>

                    </>,
                    document.getElementById("second-modal-root")
                )
            }
        </>
    )
}





// (index === 5 ? "bg-secondary text-white border-secondary " : " ")