import { useSelector } from '../../services/store';
import {
  getUserData,
  getUserIsAuthenticated,
  getUserIsLoading,
  getUserIsAuthChecked
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
  // const location = useLocation();
  const userIsLoading = useSelector(getUserIsLoading);
  const userIsAuthChecked = useSelector(getUserIsAuthChecked);
  // if (!onlyUnAuth || !isAuthenticated) {
  //   return <Preloader />;
  // }
  if (!onlyUnAuth && !isAuthenticated && userIsAuthChecked) {
    return <Navigate replace to='/login' />;
  }

  if (onlyUnAuth && isAuthenticated) {
    return <Navigate replace to='/' />;
  }

  if (userIsLoading || !userIsAuthChecked) {
    return <Preloader />;
  }

  return children;
};
