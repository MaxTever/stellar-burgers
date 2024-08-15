import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { getIngredients } from '../../services/slices/getIngredients';
import {
  clearRequestData,
  getOrderModalData,
  getOrderByIdThunk
} from '../../services/slices/orderSlice';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const dispatch = useAppDispatch();
  const orderData = useAppSelector(getOrderModalData);
  const { number } = useParams();
  const ingredients = useAppSelector(getIngredients);

  useEffect(() => {
    dispatch(getOrderByIdThunk(Number(number)));
    return () => {
      dispatch(clearRequestData());
    };
  }, [dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
