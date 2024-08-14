import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getOrders, getOrdersThunk } from '../../services/slices/orderSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(getOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
