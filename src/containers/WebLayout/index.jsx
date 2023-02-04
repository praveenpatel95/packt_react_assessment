import React from "react";
import Header from "./Header";
import {Outlet} from "react-router-dom";

function WebLayout(){
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default WebLayout;