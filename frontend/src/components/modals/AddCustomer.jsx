import React, { useState } from 'react'
import { createCustomer } from '../../api/customer'
import { useNotification } from '../../hooks'
import Modal from '../modals/Modal'
import CustomerForm from './CustomerForm'

export default function AddCustomer({ onClose }) {

    const { updateNotification } = useNotification()
    const [busy, setBusy] = useState(false)
    const handleSubmit = async (data) => {
        setBusy(true)
        const { error, customer } = await createCustomer(data)
        setBusy(false)
        if (error) return updateNotification('error', error)
        updateNotification('success', 'Customer added successfully!')
        window.location.reload(false);
        onClose()
    }
    return (
        <Modal onClose={onClose} style=" top-[25vh]" title='Customer Form'>
            <div className='w-full p-5'>
                < CustomerForm busy={busy} onSubmit={!busy ? handleSubmit : null
                } title={"Add New Customer"} btnTitle={"Add"} />
            </div>
        </Modal >
    )
}
