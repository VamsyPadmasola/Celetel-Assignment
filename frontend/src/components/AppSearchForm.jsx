import React, { useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'

const defaultInputStyle = ' '

export default function AppSearchForm({ showResetBtn = false, placeholder = '', inputClassName = defaultInputStyle, onSubmit, onReset }) {
    const [value, setValue] = useState('')

    const handleOnSubmit = (e) => {
        e.preventDefault();
        onSubmit(value)
    }

    const handleReset = () => {
        setValue('')
        onReset()
    }

    return (
        <form onSubmit={handleOnSubmit} className="relative">
            <input
                type="text"
                className={inputClassName + "  transition bg-white rounded text-lg p-4 shadow-2xl outline-none w-full"}
                placeholder={placeholder}
                value={value}
                onChange={({ target }) => setValue(target.value)}
            />
            {showResetBtn ?
                <button onClick={handleReset} type='button' className='dark:text-dark-subtle text-light-subtle absolute top-1/2 -translate-y-1/2 right-2'>
                    <RiCloseCircleLine size={22} />
                </button>
                : null}
        </form>
    )
}
