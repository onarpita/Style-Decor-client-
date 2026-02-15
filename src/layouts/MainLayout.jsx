import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
            <ToastContainer className="!z-10000000000" />
        </div>
    );
};

export default MainLayout;