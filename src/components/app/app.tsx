import {
  ConstructorPage,
  ForgotPassword,
  Login,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword,
  Feed,
  NotFound404
} from '@pages';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { useEffect } from 'react';
import { useAppDispatch } from '../../utils/hooks';
import { getIngredientsThunk } from '../../services/slices/getIngredients';
import { getUser } from '../../services/slices/userSlice';
import { title } from 'process';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const backgroundLocation = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredientsThunk());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Order ID' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Order ID' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/feed'>
          <Route index element={<Feed />} />
          {!backgroundLocation && (
            <Route path='/feed/:number' element={<OrderInfo />} />
          )}
        </Route>

        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='orders'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            {!backgroundLocation && (
              <Route path=':number' element={<OrderInfo />} />
            )}
          </Route>
        </Route>
        {!backgroundLocation && (
          <Route
            path='/ingredients/:id'
            element={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '120px',
                  flexDirection: 'column'
                }}
              >
                <h3 className={`${styles.title} text text_type_main-large`}>
                  Детали ингридента
                </h3>
                <IngredientDetails />
              </div>
            }
          />
        )}
      </Routes>
    </div>
  );
};

export default App;
