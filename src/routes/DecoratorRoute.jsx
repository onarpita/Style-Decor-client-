import { Navigate } from 'react-router';
import useRole from '../hooks/useRole';
import Loader from '../components/shared/Loader';

const DecoratorRoute = ({ children }) => {
    const [role, isRoleLoading] = useRole();

    if (isRoleLoading) return <Loader/>;
    if (role === 'decorator') return children;
    return <Navigate to='/' replace='true' />;
}

export default DecoratorRoute;
