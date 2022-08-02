import { Navigate, Outlet } from 'react-router-dom';
import { useTypedSelector } from '../hooks';

const ProtectedRoute: React.FC = () => {
  const user = useTypedSelector(({ user }) => user.data);

  return user.id && user.id !== 'out' ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
