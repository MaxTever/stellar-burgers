import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getConstructorItems,
  getIngredientsIds
} from '../../services/slices/constructorSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { getUserIsAuthenticated } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router';
import {
  getOrderRequest,
  getOrderModalData,
  orderBurger,
  clearRequestData
} from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const constructorItems = useAppSelector(getConstructorItems);

  const orderRequest = useAppSelector(getOrderRequest);

  const orderModalData = useAppSelector(getOrderModalData);

  const userIsAuthenticated = useAppSelector(getUserIsAuthenticated);
  const ingredientsIds = useAppSelector(getIngredientsIds);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!userIsAuthenticated) {
      navigate('/login');
      return;
    }
    if (ingredientsIds) {
      dispatch(orderBurger(ingredientsIds));
    }
  };

  const closeOrderModal = () => {
    dispatch(clearRequestData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
