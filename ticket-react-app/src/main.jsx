import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "../views/NotFound.jsx";
import Home from "../views/Home.jsx";
import AdminLayout from "../components/Layouts/AdminLayout.jsx";
import Login from "../views/Login.jsx";
import Dashboard from "../views/Dashboard.jsx";
import { ContextProvider } from "../contexts/ContextProvider.jsx";
import ReserveBooking from "../views/ReserveBooking.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },

    {
        path: "/",
        element: <AdminLayout />,
        children: [{ path: "/admin/dashboard", element: <Dashboard /> }],
    },

    {
        path: "*",
        element: <NotFound />,
    },

    {
        path: "/admin/login",
        element: <Login />,
    },

    {
        path: "/book-appointment",
        element: <ReserveBooking />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
            <RouterProvider router={router}></RouterProvider>
        </ContextProvider>
    </React.StrictMode>
);
