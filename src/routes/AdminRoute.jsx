import { Navigate } from 'react-router';
import useRole from '../hooks/useRole';
import Loader from '../components/shared/Loader';

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <Loader/>;
  if (role === 'admin') return children;
  return <Navigate to='/' replace='true' />;
}

export default AdminRoute;
