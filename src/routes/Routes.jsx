import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import ManageDecorators from "../pages/AdminDashboard/ManageDecorators";
import AdminRoute from "./AdminRoute";
import ManageServices from "../pages/AdminDashboard/ManageServices";
import AddService from "../pages/AdminDashboard/AddService";
import Home from "../pages/Home/Home";
import ServiceDetail from "../pages/ServiceDetail/ServiceDetail";
import BookingForm from "../pages/BookingForm/BookingForm";
import ManageBookings from "../pages/AdminDashboard/ManageBookings";
import UserRoute from "./UserRoute";
import UserProfile from "../pages/UserDashboard/UserProfile";
import UserBookings from "../pages/UserDashboard/UserBookings";
import NotFound404 from "../pages/NotFound404/NotFound404";
import PaymentSuccess from "../pages/UserDashboard/PaymentSuccess";
import PaymentCancelled from "../pages/UserDashboard/PaymentCancelled";
import PaymentHistory from "../pages/UserDashboard/PaymentHistory";
import DecoratorRoute from "./DecoratorRoute";
import AssignedServices from "../pages/DecoratorDashboard/AssignedServices";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import AllServices from "../pages/AllServices/AllServices";
import UpdateProfile from "../pages/UserDashboard/UpdateProfile";
import ContactPage from "../pages/ContactPage/ContactPage";
import AboutPage from "../pages/AboutPage/AboutPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/about",
                Component: AboutPage
            },
            {
                path: "/contact",
                Component: ContactPage
            },
            {
                path: "/all-services",
                Component: AllServices
            },
            {
                path: "/service/:id",
                Component: ServiceDetail,
                loader: ({params}) => fetch(`${import.meta.env.VITE_baseURL}/service/${params.id}`)
            },
            {
                path: "/book-service/:id",
                Component: BookingForm,
                loader: ({params}) => fetch(`${import.meta.env.VITE_baseURL}/service/${params.id}`)
            },
            {
                path: "/login",
                Component: Login
            },
            {
                path: "/register",
                Component: Register
            }
        ]
    },

    // Dashboard routes
    {
        path: "/dashboard",
        element: <PrivateRoute>
            <DashboardLayout/>
        </PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome,
            },
            // Admin routes
            {
                path: "/dashboard/manage-decorators",
                element: <AdminRoute>
                    <ManageDecorators/>
                </AdminRoute>
            },
            {
                path: "/dashboard/manage-services",
                element: <AdminRoute>
                    <ManageServices/>
                </AdminRoute>
            },
            {
                path: "/dashboard/add-service",
                element: <AdminRoute>
                    <AddService/>
                </AdminRoute>
            },
            {
                path: "/dashboard/manage-bookings",
                element: <AdminRoute>
                    <ManageBookings/>
                </AdminRoute>
            },

            // Decorator routes
            {
                path: "/dashboard/assigned-services",
                element: <DecoratorRoute>
                    <AssignedServices/>
                </DecoratorRoute>
            },

            // User routes
            {
                path: "/dashboard/user-profile",
                element: <UserRoute>
                    <UserProfile/>
                </UserRoute>
            },
            {
                path: "/dashboard/user-bookings",
                element: <UserRoute>
                    <UserBookings/>
                </UserRoute>
            },
            {
                path: "/dashboard/payment-success",
                element: <UserRoute>
                    <PaymentSuccess/>
                </UserRoute>
            },
            {
                path: "/dashboard/update-profile",
                element: <UserRoute>
                    <UpdateProfile/>
                </UserRoute>,
            },
            {
                path: "/dashboard/payment-cancelled",
                element: <UserRoute>
                    <PaymentCancelled/>
                </UserRoute>
            },
            {
                path: "/dashboard/payment-history",
                element: <UserRoute>
                    <PaymentHistory/>
                </UserRoute>
            },
        ]
    },
    {
        path: "*",
        Component: NotFound404,
    }
]);