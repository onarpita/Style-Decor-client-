import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const {user, setUser, signOutUser} = useAuth();
    useEffect(() => {
        const html = document.querySelector("html");
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);
    const handleSignOut = () => {
        signOutUser().then(() => {
            setUser(null);
        }).catch((error) => {
            toast.error(error.code);
        });
    }
    const links = <>
        <li>
            <NavLink to="/">Home</NavLink>
        </li>
        <li>
            <NavLink to="/about">About</NavLink>
        </li>
        <li>
            <NavLink to="/all-services">All Services</NavLink>
        </li>
        <li>
            <NavLink to="/contact">Contact</NavLink>
        </li>
        {
            user && <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
        }
    </>;
    return (
        <div className="drawer sticky top-0 z-10000">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-base-100 dark:bg-base-300 shadow-sm">
                    <div className="navbar-start">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>
                        <Link to="/" className="btn btn-ghost text-xl">
                            <img src={logo} className="w-10 mr-2" />
                            <h2 className="text-xl max-sm:hidden font-semibold">Style Decor</h2>
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end gap-3">
                        <button>{theme === "light" ? <FaMoon onClick={() => setTheme("dark")} className="text-2xl" /> : <FaSun onClick={() => setTheme("light")} className="text-2xl" />}</button>
                        {user ? <>
                            <img src={user.photoURL} className="size-10 rounded-full object-cover" />
                            <button onClick={handleSignOut} className="btn btn-primary text-black">Logout</button>
                        </> : <>
                            <Link to="/login" className="btn btn-primary text-black">Login</Link>
                            <Link to="/register" className="btn btn-secondary text-white">Register</Link>
                        </>}
                    </div>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-70 p-4">
                    {/* Sidebar content here */}
                    {links}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;