import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";

export default function UserNavigator() {
    return (
        <>
            <div className="">

                <Routes>
                    <Route path="/dashboard" element={<Home />} />
                </Routes>
            </div>
        </>
    );
}
