import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import UserNavigator from "./components/UserNavigator";
import { useAuth } from "./hooks";

export default function App() {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  if (isLoggedIn) return <UserNavigator />;

  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
