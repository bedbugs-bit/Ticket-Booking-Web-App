// import React from 'react'
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import { Navigate, Outlet } from "react-router-dom";

function AdminLayout() {
    const { token } = useStateContext();
    if (!token) {
        return <Navigate to="/admin/dashboard" />;
    }

    return (
        <div>
            DefaultLayout
            <Outlet />
        </div>
    );
}

export default AdminLayout;
