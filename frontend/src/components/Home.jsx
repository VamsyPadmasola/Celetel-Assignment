import React, { useEffect, useState } from "react";
import Navbar from "./admin/Navbar";
import CustomerList from "./CustomerList";
import Header from "./user/Header";
import { BsFilterRight } from "react-icons/bs"
import { IoIosAdd } from "react-icons/io"
import AddCustomer from "./modals/AddCustomer";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";


export default function Home() {

	const [addCustomerModal, setAddCustomerModal] = useState(false);
	const { handleLogin, authInfo } = useAuth();
	const { isPending, isLoggedIn } = authInfo;
	const navigate = useNavigate();

	// if (!isLoggedIn)
	// 	navigate("/")


	const handleOnAdd = () => {
		setAddCustomerModal(previousState => !previousState)
	}

	const handleAddCustomerModal = () => {
		setAddCustomerModal(previousState => !previousState)
	}


	return (
		<div className="flex bg-secondary">
			<Navbar />
			<div className="ml-5 p-5 flex-1 max-w-screen-xl overflow-hidden">
				<Header />
				<div className="flex flex-col space-y-5 mr-8">
					<div className="mt-10">
						<span className="text-4xl font-bold">Customer Details</span>
					</div>
					<div className="flex items-center justify-between">
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
					<div>
						<CustomerList />
					</div>
				</div>
			</div>
			{
				addCustomerModal &&
				<AddCustomer onClose={handleAddCustomerModal} />
			}

		</div >
	)
}
