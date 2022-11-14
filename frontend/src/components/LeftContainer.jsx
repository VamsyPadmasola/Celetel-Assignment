import React, { useEffect, useState } from "react";
import Logo from "./Logo";

export default function LeftContainer() {
    return (
        <div className="h-full bg-white relative w-[45%] min-h-screen flex items-center justify-center">
            <Logo width={333} height={333} />
        </div>
    );
}
