import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getConstructorItems,
  getIngredientsIds
} from '../../services/slices/constructorSlice';
import { useSelector, useDispatch } from '../../services/store';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getConstructorItems);

  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getOrderModalData);

  const userIsAuthenticated = useSelector(getUserIsAuthenticated);
  const ingredientsIds = useSelector(getIngredientsIds);

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
