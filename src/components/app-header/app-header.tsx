import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../utils/hooks';
import { getUserData } from '../../services/slices/userSlice';

export const AppHeader: FC = () => (
  <AppHeaderUI userName={useAppSelector(getUserData).name} />
);
