import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { signout } from '@redux/slices/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignoutPage = () => {
  // redux
  const { success, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  // router
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!success) {
      navigate('/');
      return;
    }

    dispatch(signout());
    navigate('/');
  });

  return <></>;
};
