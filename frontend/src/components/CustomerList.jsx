import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCustomer, getCustomers, searchCustomer } from "../api/customer";
import { useNotification, useSearch } from "../hooks";
import NextAndPreviousButton from "./NextAndPreviousButton";
import { MdOutlineModeEdit } from "react-icons/md"
import { AiOutlineDelete } from "react-icons/ai"
import ConfirmModal from "./modals/ConfirmModal";
import UpdateCustomer from "./UpdateCustomer";
import { BsFilterRight } from "react-icons/bs"
import { IoIosAdd } from "react-icons/io"
import AddCustomer from "./modals/AddCustomer";
import SearchBox from "./Interface/Search";
import { MdNotifications } from 'react-icons/md'
import AppSearchForm from "./AppSearchForm";

let currentPageNo = 0;
const limit = 4;
export default function CustomerList() {

    const [addCustomerModal, setAddCustomerModal] = useState(false);
    const [customers, setCustomers] = useState([])
    const [results, setResults] = useState([])
    const [reachedToEnd, setReachedToEnd] = useState(false);
    const { updateNotification } = useNotification();
    const { handleSearch, resetSearch, resultNotFound } = useSearch();
    const [selectedProfile, setSelectedProfile] = useState(null)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showUpdateCustomerModal, setShowUpdateCustomerModal] = useState(false)
    const [busy, setBusy] = useState(false);

    const handleOnAdd = () => {
        setAddCustomerModal(previousState => !previousState)
    }

    const fetchCustomers = async (pageNo) => {
        const { profiles, error } = await getCustomers(pageNo, limit);
        if (error) return updateNotification("error", error);

        if (!profiles.length) {
            currentPageNo = pageNo - 1;
            return setReachedToEnd(true);
        }
        setCustomers([...profiles]);
    };

    const hideConfirmModal = () => {
        setShowConfirmModal(false)
    }

    const handleAddCustomerModal = () => {
        setAddCustomerModal(previousState => !previousState)
    }

    const handleUpdateCustomerModal = () => {
        setShowUpdateCustomerModal(previousState => !previousState)
    }

    const handleOnDeleteConfirm = async () => {
        setBusy(true)
        const { error, message } = await deleteCustomer(selectedProfile.id)
        setBusy(false)
        if (error) return updateNotification('error', error)
        updateNotification('success', message)
        hideConfirmModal()
        fetchCustomers(currentPageNo)
    }

    const handleOnCustomerAdd = (profile) => {
        const updatedCustomers = customers.map(customer => {
            if (profile.id == customer.id) {
                return profile
            }

            return customer
        })

        setCustomers([...updatedCustomers])

    }

    const handleConfirmModal = () => {
        setShowConfirmModal(previousState => !previousState)
    }

    const handleOnDeleteClick = (profile) => {
        setShowConfirmModal(!showConfirmModal)
        setSelectedProfile(profile)
    }

    const handleOnEdit = (profile) => {
        setSelectedProfile(profile)
        setShowUpdateCustomerModal(!showUpdateCustomerModal)
    }

    const handleOnCustomerUpdate = (profile) => {
        console.log(profile)
        const updatedCustomers = customers.map(customer => {
            if (profile.id == customer._id) {
                return profile
            }

            return customer
        })

        setCustomers([...updatedCustomers])
        window.location.reload(false)
    }


    const handleOnNextClick = () => {
        if (reachedToEnd) return;
        currentPageNo += 1;
        fetchCustomers(currentPageNo);
    };

    const handleOnPrevClick = () => {
        if (currentPageNo <= 0) return;
        if (reachedToEnd) setReachedToEnd(false)
        currentPageNo -= 1;
        fetchCustomers(currentPageNo);
    };


    const handleOnSearchSubmit = (value) => {
        handleSearch(searchCustomer, value, setResults)
    }

    const handleSearchFormReset = () => {
        resetSearch()
        setResults([])
    }

    useEffect(() => {
        fetchCustomers();
    }, []);


    return (
        <>
            <div className='flex-1 max-w-screen-xl flex items-center justify-between h-24'>
                <div className="w-[70%]">
                    <AppSearchForm onReset={handleSearchFormReset}
                        showResetBtn={results.length || resultNotFound}
                        onSubmit={handleOnSearchSubmit} placeholder="Search..." />
                </div>
                <div className="w-[30%] flex items-end justify-end space-x-8">
                    <MdNotifications size={50} color={"#757575"} />
                    <div className="bg-highlight text-center rounded-[50%] w-10 h-10 p-2 text-white font-bold">
                        A
                    </div>
                </div>
            </div>
            <div className="h-screen">
                <div className="mt-10">
                    <span className="text-4xl font-bold">Customer Details</span>
                </div>
                <div className="flex items-center justify-between mb-5 mt-8">
                    <span className="text-xl" >The terms you are tracking</span>
                    <div className="items-end flex space-x-4">
                        <div className="cursor-pointer flex space-x-3 w-28 justify-center items-center border-ternary h-10 border-2 rounded-xl">
                            <BsFilterRight size={24} color={"#757575"} />
                            <span className="text-ternary">Filter</span>
                        </div>
                        <div className="cursor-pointer flex space-x-3 w-28 justify-center items-center bg-[#ec633c] h-10 rounded-xl"
                            onClick={handleOnAdd}>
                            <IoIosAdd size={24} color={"#ffffff"} />
                            <span className="text-white">Add</span>
                        </div>
                    </div>
                </div>

                <div className="bg-secondary rounded w-[100%] min-h-[39%] mb-10">
                    <table className="border-none w-full shadow-2xl rounded divide-y divide-slate-200">
                        <tr className=" bg-white h-16">
                            <th className="w-[20%] text-left pl-8">
                                Username
                            </th>
                            <th className="w-[20%] text-left pl-8">
                                E-mail
                            </th>
                            <th className="w-[20% text-left pl-8">
                                Phone No.
                            </th>
                            <th className="w-[20%] text-left pl-8">
                                Company
                            </th>
                            <th className="w-[20%] text-left pl-8">
                                Action
                            </th>
                        </tr>
                        {results.length || resultNotFound
                            ?
                            results.map(customer => (
                                <tr className="bg-white h-16">
                                    <td className="pl-8">
                                        {customer.name}
                                    </td>
                                    <td className="pl-8">
                                        {customer.email}
                                    </td>
                                    <td className="pl-8">
                                        {customer.contact}
                                    </td>
                                    <td className="pl-8">
                                        {customer.company}
                                    </td>
                                    <td className="pl-8">
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleOnEdit(customer)}>< MdOutlineModeEdit size={24} color={"#2088d2"} /></button>
                                            <button onClick={() => handleOnDeleteClick(customer)}><AiOutlineDelete size={24} /></button>
                                        </div>
                                    </td>
                                </tr>)

                            )
                            :
                            customers.map(customer =>
                            (
                                <tr className="bg-white p-5 h-16 border-b-[1px] border-ternary">
                                    <td className="pl-8">
                                        {customer.name}
                                    </td>
                                    <td className="pl-8">
                                        {customer.email}
                                    </td>
                                    <td className="pl-8">
                                        {customer.contact}
                                    </td>
                                    <td className="pl-8">
                                        {customer.company}
                                    </td>
                                    <td className="pl-8">
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleOnEdit(customer)}>< MdOutlineModeEdit size={24} color={"#2088d2"} /></button>
                                            <button onClick={() => handleOnDeleteClick(customer)}><AiOutlineDelete size={24} /></button>
                                        </div>

                                    </td>
                                </tr>)
                            )
                        }
                    </table>
                </div>
                {<NextAndPreviousButton
                    className="mt-5"
                    onNextClick={handleOnNextClick}
                    onPrevClick={handleOnPrevClick}
                    pageNo={currentPageNo} />}

                {
                    showConfirmModal &&
                    <ConfirmModal
                        onClose={handleConfirmModal}
                        title='Are you sure?'
                        subtitle={"This action will remove this profile permanently!"}
                        busy={busy}
                        onConfirm={handleOnDeleteConfirm}
                        onCancel={hideConfirmModal}
                    />
                }

                {
                    showUpdateCustomerModal &&
                    <UpdateCustomer
                        initialState={selectedProfile}
                        onClose={handleUpdateCustomerModal}
                        onSuccess={handleOnCustomerUpdate} />
                }
                {
                    addCustomerModal &&
                    <AddCustomer onClose={handleAddCustomerModal} onSuccess={handleOnCustomerAdd} />
                }
            </div >
        </>
    );
}
