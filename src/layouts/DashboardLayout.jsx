import { FaHome, FaRegCalendarAlt } from "react-icons/fa";
import { FaUser, FaUsers } from "react-icons/fa6";
import { GiSofa } from "react-icons/gi";
import { IoMdCard } from "react-icons/io";
import { MdRoomService } from "react-icons/md";
import { TbCalendarUser } from "react-icons/tb";
import { Link, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

const DashboardLayout = () => {
    const [role] = useRole();
    const { user, signOutUser, setUser } = useAuth();
    const handleLogOut = () => {
        signOutUser().then(() => {
            setUser(null);
        }).catch((error) => {
            toast.error(error.code);
        });
    }
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4 flex justify-between items-center w-full">
                        <Link to="/" className="font-semibold">Style Decor</Link>
                        <div>
                            {user && role === "user" && <>
                                <div tabIndex={0} role="button" className="btn btn-ghost avatar tooltip tooltip-bottom" data-tip={user.displayName}>
                                    <Link to="/dashboard/user-profile">
                                        <img
                                            className="w-10 rounded-full"
                                            alt={user.displayName}
                                            src={user.photoURL} />
                                    </Link>
                                </div>
                                <button onClick={handleLogOut} className="btn btn-primary text-black">Logout</button>
                            </>}
                        </div>
                    </div>
                </nav>
                {/* Page content here */}
                <div className="p-4">
                    <Outlet/>
                    <ToastContainer className="!z-10000000000" />
                </div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li>
                            <Link to="/dashboard" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard Home">
                                <FaHome />
                                <span className="is-drawer-close:hidden">Dashboard Home</span>
                            </Link>
                        </li>
                        {role === "user" && <>
                            <li>
                                <Link to="/dashboard/user-profile" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                                    <FaUser />
                                    <span className="is-drawer-close:hidden">My Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/user-bookings" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Bookings">
                                    <TbCalendarUser />
                                    <span className="is-drawer-close:hidden">My Bookings</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/payment-history" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History">
                                    <IoMdCard />
                                    <span className="is-drawer-close:hidden">Payment History</span>
                                </Link>
                            </li>
                        </>}
                        {role === "decorator" && <>
                            <li>
                                <Link to="/dashboard/assigned-services" className="is-drawer-close:tooltip is-drawer-close:tooltip-right"  data-tip="Assigned Services">
                                    <MdRoomService />
                                    <span className="is-drawer-close:hidden">Assigned Services</span>
                                </Link>
                            </li>
                        </>}
                        {role === "admin" && <>
                            <li>
                                <Link to="/dashboard/manage-decorators" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Decorators">
                                    <FaUsers />
                                    <span className="is-drawer-close:hidden">Manage Decorators</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/manage-services" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Services">
                                    <GiSofa />
                                    <span className="is-drawer-close:hidden">Manage Services</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/manage-bookings" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Bookings">
                                    <FaRegCalendarAlt />
                                    <span className="is-drawer-close:hidden">Manage Bookings</span>
                                </Link>
                            </li>
                        </>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;