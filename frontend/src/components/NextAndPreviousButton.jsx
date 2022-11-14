import React from 'react'
import { GrPrevious } from 'react-icons/gr'
import { GrNext } from 'react-icons/gr'
export default function NextAndPreviousButton({ onNextClick, onPrevClick, className = '', pageNo }) {
    const getClasses = () => {
        return "flex justify-end items-center space-x-3 ";
    }

    return (
        <div className={getClasses() + className}>
            <GrPrevious onClick={onPrevClick} size={52} color={"#757575"} />
            <span>{Number(pageNo <= 9) ? "0" + Number(pageNo + 1) : Number(pageNo + 1)}</span>
            <GrNext onClick={onNextClick} size={52} color={"#757575"} />
        </div>
    )
}

const Button = ({ title, onClick }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className="text-black hover:underline">
            {title}
        </button>
    )
}
