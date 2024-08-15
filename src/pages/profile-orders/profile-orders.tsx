import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { getOrders, getOrdersThunk } from '../../services/slices/orderSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useAppSelector(getOrders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
