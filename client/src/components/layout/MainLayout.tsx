import { Footer } from '@components/layout/Footer';
import { Navbar } from '@components/layout/Navbar';
import { getProfile } from '@redux/actions/auth/getProfile';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  // redux
  const { userInfo, success, userToken, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // if user is connected but not userinfo has been set yet, set it
  useEffect(() => {
    if (loading) return;
    if (success && userToken && !userInfo) {
      dispatch(getProfile(userToken));
    }
  }, [dispatch, success, loading, userInfo, userToken]);

  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
