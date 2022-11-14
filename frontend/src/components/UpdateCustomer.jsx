import React, { useState } from 'react'
import { useNotification } from '../hooks'
import { updateCustomer } from '../api/customer'
import Modal from './modals/Modal'
import CustomerForm from './modals/CustomerForm'

export default function UpdateCustomer({ onClose, onSuccess, initialState }) {
    const { updateNotification } = useNotification()
    const [busy, setBusy] = useState(false)
    const handleSubmit = async (data) => {
        setBusy(true)
        const { error, customer } = await updateCustomer(initialState.id, data)
        setBusy(false)
        if (error) return updateNotification('error', error)
        onSuccess(customer)
        updateNotification('success', 'Customer updated successfully!')
        onClose()
    }
    return (
        <Modal onClose={onClose} style=" top-[25vh]" title='Edit Customer Form'>
            <div className='w-full p-5'>
                <CustomerForm
                    busy={busy}
                    initialState={initialState}
                    onSubmit={!busy ? handleSubmit : null}
                    title={"Update Customer"}
                    btnTitle={"Update"}
                />
            </div>
        </Modal >
    )
}
