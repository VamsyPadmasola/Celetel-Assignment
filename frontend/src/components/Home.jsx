import React, { useEffect, useState } from "react";
import Navbar from "./admin/Navbar";
import CustomerList from "./CustomerList";
import { MdNotifications } from 'react-icons/md'
import { BsFilterRight } from "react-icons/bs"
import { IoIosAdd } from "react-icons/io"
import AddCustomer from "./modals/AddCustomer";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import SearchBox from "./Interface/Search";


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
			<div className="flex flex-col space-y-5 mr-8 w-full p-5 pl-8">
				<CustomerList />
			</div>
		</div>


	)
}
