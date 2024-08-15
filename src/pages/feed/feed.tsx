import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { getFeedsOrders, getFeedsThunk } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getFeedsOrders);

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeedsThunk());
      }}
    />
  );
};
