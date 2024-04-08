import { Account } from '@components/standalone/Account';
import { Cta } from '@components/standalone/Cta';
import { Input } from '@components/standalone/Input';
import { editProfile } from '@redux/actions/auth/editProfile';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const { success, loading, userInfo, userToken } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<
    { name: string; display_balance: string; isCurrent?: boolean }[]
  >([]);
  const [newFirstname, setNewFirstname] = useState<string>();
  const [newLastName, setNewLastName] = useState<string>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setAccounts([
      {
        name: 'Argent Bank Checking (x8349)',
        display_balance: '$2,082.79',
      },
      {
        name: 'Argent Bank Savings (x6712)',
        display_balance: '$10,928.42',
      },
      {
        name: 'Argent Bank Credit Card (x8349)',
        display_balance: '$184.30',
        isCurrent: true,
      },
    ]);
  }, []);

  useEffect(() => {
    if (!success) navigate('/signin');
  }, [navigate, success]);

  const resetEditing = useCallback(() => {
    setIsEditing(false);
    setNewFirstname(undefined);
    setNewLastName(undefined);
  }, []);

  const isSubmittable = useMemo(() => {
    return userToken && newFirstname?.trim().length && newLastName?.trim().length;
  }, [newFirstname, newLastName, userToken]);

  const handleEditSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isSubmittable) {
        return;
      }

      dispatch(
        editProfile({ token: userToken!, firstName: newFirstname!, lastName: newLastName! })
      );
      setIsEditing(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, isSubmittable]
  );

  if (loading || !userInfo) return <></>;

  return (
    <>
      <div className='header'>
        <h1>
          Welcome back
          <br />
          {`${userInfo.firstName} ${userInfo.lastName}!`}
        </h1>
        {!isEditing && (
          <Cta onClick={() => setIsEditing(true)} label='Edit Name' className='edit-button' />
        )}
      </div>

      {isEditing && (
        <form className='edit-form' onSubmit={handleEditSubmit}>
          <Input label='Firstname' setValue={setNewFirstname} placeholder={userInfo.firstName} />
          <Input label='Lastname' setValue={setNewLastName} placeholder={userInfo.lastName} />
          <Cta label='Save' type='submit' color='white' disabled={!isSubmittable} />
          <Cta label='Cancel' onClick={resetEditing} color='white' />
        </form>
      )}

      <h2 className='sr-only'>Accounts</h2>

      {accounts.map((account) => (
        <Account {...account} />
      ))}
    </>
  );
};
