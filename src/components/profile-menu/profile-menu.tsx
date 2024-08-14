import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
