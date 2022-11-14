import React, { useEffect, useState } from 'react'
import { ImSpinner3 } from 'react-icons/im'
import { useNotification } from '../../hooks'
import { isValidEmail } from '../../utils/helper';

const commonInputClasses = " w-full bg-transparent outline-none border-b-2 border-black focus:border-highlight transition text-black";


const commonModalButtonClasses = "bg-success text-white p-1 rounded px-3 hover:bg-opacity-80 transition"

const defaultCustomerInfo = {
    name: '',
    email: '',
    contact: '',
    company: ''
}

const validateCustomer = (customerInfo) => {
    const { name, email, contact, company } = customerInfo;

    if (!name.trim()) return { error: 'Customer name is missing!' }
    if (!email.trim()) return { error: 'E-mail field is missing!' }
    if (!isValidEmail(email)) return { error: 'Email is invalid' }
    if (!contact.trim()) return { error: 'Contact is missing!' }
    if (contact.length < 10) return { error: 'Invalid Contact' }
    if (!company.trim()) return { error: 'Company is missing!' }

    return { error: null }
}
export default function CustomerForm({ title, btnTitle, busy, onSubmit, initialState }) {
    const [customerInfo, setCustomerInfo] = useState({ ...defaultCustomerInfo })

    const handleChange = ({ target }) => {
        const { value, files, name } = target;
        setCustomerInfo({ ...customerInfo, [name]: value })
    }



    const { name, email, contact, company } = customerInfo;

    const { updateNotification } = useNotification()

    const handleSubmit = (e) => {
        e.preventDefault();
        const { error } = validateCustomer(customerInfo)
        if (error) return updateNotification('error', error)

        // const formData = new FormData()
        // for (let key in customerInfo) {
        //     if (key) formData.append(key, customerInfo[key])
        // }

        onSubmit(customerInfo)
    }

    useEffect(() => {
        if (initialState) {
            setCustomerInfo({ ...initialState });
        }
    }, [initialState])
    return (
        <form onSubmit={handleSubmit}>
            <div className='flex justify-between items-center mb-5'>
                <h1 className='font-semibold text-xl text-black'>{title}</h1>
            </div>
            <div className='flex space-x-4 rounded'>
                <div className='flex-grow flex flex-col space-y-6'>
                    <input placeholder='Enter Name'
                        name='name' type='text'
                        className={commonInputClasses + ' border-b-2'}
                        value={name}
                        onChange={handleChange}
                        autoComplete="off"
                        spellCheck="false"
                    />
                    <input
                        name='email'
                        placeholder='Enter E-mail'
                        value={email}
                        className={commonInputClasses + ' border-b-2 resize-none h-full custom-scroll-bar '}
                        onChange={handleChange}
                        spellCheck="false"
                        autoComplete='off' ></input>
                    <input
                        name='contact'
                        placeholder='Enter Contact'
                        type={"number"}
                        value={contact}
                        className={commonInputClasses + ' border-b-2 resize-none h-full custom-scroll-bar '}
                        onChange={handleChange}
                        spellCheck="false"
                        autoComplete='off' ></input>
                    <input
                        name='company'
                        placeholder='Enter Company'
                        value={company}
                        className={commonInputClasses + ' border-b-2 resize-none h-full custom-scroll-bar '}
                        onChange={handleChange}
                        spellCheck="false"
                        autoComplete='off'></input>
                </div>
            </div>
            <div className='mt-6 flex justify-end items-end'>
                <button type='submit' className={commonModalButtonClasses + ' w-36 h-8 flex items-center justify-center '}>
                    {busy ? <ImSpinner3 size={20} className="animate-spin" /> : btnTitle}
                </button>
            </div>
        </form>
    )
}
