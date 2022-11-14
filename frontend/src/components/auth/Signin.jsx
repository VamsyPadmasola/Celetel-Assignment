import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/helper";

import CustomLink from "../CustomLink";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit"
import LeftContainer from "../LeftContainer";

const validateUserInfo = ({ email, password }) => {
	if (!email.trim()) return { ok: false, error: "Email is missing!" };
	if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

	if (!password.trim()) return { ok: false, error: "Password is missing!" };
	if (password.length < 8)
		return { ok: false, error: "Password must be 8 characters long!" };

	return { ok: true };
};

export default function Signin() {
	const [userInfo, setUserInfo] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();
	const { updateNotification } = useNotification();
	const { handleLogin, authInfo } = useAuth();
	const { isPending, isLoggedIn } = authInfo;

	const handleChange = ({ target }) => {
		const { value, name } = target;
		setUserInfo({ ...userInfo, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { ok, error } = validateUserInfo(userInfo);

		if (!ok) return updateNotification("error", error);
		handleLogin(userInfo.email, userInfo.password);
		console.log(authInfo)
	};

	// useEffect(() => {
	//   // we want to move our user to somewhere else
	//   if (isLoggedIn) navigate("/");
	// }, [isLoggedIn]);

	return (
		<div className="flex bg-secondary w-full min-h-screen">
			<LeftContainer />
			<form className="w-[55%] flex items-center justify-center">
				<div className="w-[60%] bg-white rounded">
					<div className="bg-highlight w-full p-5 text-white text-center rounded">
						<h1>Sign in</h1>
					</div>
					<div className="p-4 flex flex-col space-y-5">
						<FormInput
							value={userInfo.email}
							onChange={handleChange}
							label="Email"
							placeholder="john@email.com"
							name="email"
						/>
						<FormInput
							value={userInfo.password}
							onChange={handleChange}
							label="Password"
							placeholder="********"
							name="password"
							type="password"
						/>

						<div className="flex items-center justify-center">
							<Submit value="Sign in" onClick={handleSubmit} busy={isPending} />
						</div>

						<div className="flex justify-between">
							<CustomLink to="/auth/signup">Sign up</CustomLink>
						</div>
					</div>
				</div>
			</form>

		</div >
	);
}
