import React, { useEffect, useState } from "react";
import { deleteCustomer, getCustomers } from "../api/customer";
import { useNotification, useSearch } from "../hooks";
import NextAndPreviousButton from "./NextAndPreviousButton";
import { MdOutlineModeEdit } from "react-icons/md"
import { AiOutlineDelete } from "react-icons/ai"
import ConfirmModal from "./modals/ConfirmModal";
import UpdateCustomer from "./UpdateCustomer";

let currentPageNo = 0;
const limit = 4;
export default function CustomerTable(results, customers) {
    return (
        <div className="h-screen">
            <div className="bg-secondary rounded w-[100%] min-h-[39%]">
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
                    {/* </table> */}
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
                                <td className="flex space-x-2 pl-8">
                                    <button onClick={() => handleOnEdit(customer)} >< MdOutlineModeEdit size={24} color={"#2088d2"} /></button>

                                    <button onClick={() => handleOnDeleteClick(customer)} ><AiOutlineDelete size={24} /></button>
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



            {!results.length && !resultNotFound ? <NextAndPreviousButton
                className="mt-5"
                onNextClick={handleOnNextClick}
                onPrevClick={handleOnPrevClick}
                pageNo={currentPageNo} /> : null}

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
        </div >
    );
}
