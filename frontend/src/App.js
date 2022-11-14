import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
