import useRole from "../../hooks/useRole";
import AdminDashboardHome from "../AdminDashboard/AdminDashboardHome";
import DecoratorDashboardHome from "../DecoratorDashboard/DecoratorDashboardHome";
import UserDashboardHome from "../UserDashboard/UserDashboardHome";

const DashboardHome = () => {
    const [role] = useRole();
    if(role === "admin"){
        return <AdminDashboardHome/>;
    }
    else if(role === "decorator"){
        return <DecoratorDashboardHome/>;
    }
    else{
        return <UserDashboardHome/>;
    }
};

export default DashboardHome;