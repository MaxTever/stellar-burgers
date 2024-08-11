import { useSelector } from '../../services/store';
import {
  getUserData,
  getUserIsAuthenticated
} from '../../services/slices/userSlice';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(getUserIsAuthenticated);
  // const user = useSelector(getUserData);
  const location = useLocation();

  // if (!isAuthenticated) {
  //   return <Preloader />;
  // }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' />;
  }

  if (onlyUnAuth && isAuthenticated) {
    return <Navigate replace to='/' />;
  }

  return children;
};
