import { Input } from '@components/standalone/Input';
import { editProfile } from '@redux/actions/auth/editProfile';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const { success, loading, userInfo } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newFirstname, setNewFirstname] = useState<string>();
  const [newLastName, setNewLastName] = useState<string>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!success) navigate('/signin');
  }, [navigate, success]);

  const resetEditing = useCallback(() => {
    setIsEditing(false);
    setNewFirstname(undefined);
    setNewLastName(undefined);
  }, []);

  const handleEditSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (
        !userToken ||
        !newFirstname ||
        newFirstname.trim().length === 0 ||
        !newLastName ||
        newLastName.trim().length === 0
      ) {
        return;
      }

      dispatch(editProfile({ token: userToken, firstName: newFirstname, lastName: newLastName }));
    },
    [dispatch, newFirstname, newLastName, userToken]
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
          <button className='edit-button' onClick={() => setIsEditing(true)}>
            Edit Name
          </button>
        )}
      </div>

      {isEditing && (
        <form className='edit-form' onSubmit={handleEditSubmit}>
          <Input label='Firstname' setValue={setNewFirstname} />
          <Input label='Lastname' setValue={setNewLastName} />
          <button type='submit'>Save</button>
          <button onClick={resetEditing}>Cancel</button>
        </form>
      )}

      <h2 className='sr-only'>Accounts</h2>
      <section className='account'>
        <div className='account-content-wrapper'>
          <h3 className='account-title'>Argent Bank Checking (x8349)</h3>
          <p className='account-amount'>$2,082.79</p>
          <p className='account-amount-description'>Available Balance</p>
        </div>
        <div className='account-content-wrapper cta'>
          <button className='transaction-button'>View transactions</button>
        </div>
      </section>
      <section className='account'>
        <div className='account-content-wrapper'>
          <h3 className='account-title'>Argent Bank Savings (x6712)</h3>
          <p className='account-amount'>$10,928.42</p>
          <p className='account-amount-description'>Available Balance</p>
        </div>
        <div className='account-content-wrapper cta'>
          <button className='transaction-button'>View transactions</button>
        </div>
      </section>
      <section className='account'>
        <div className='account-content-wrapper'>
          <h3 className='account-title'>Argent Bank Credit Card (x8349)</h3>
          <p className='account-amount'>$184.30</p>
          <p className='account-amount-description'>Current Balance</p>
        </div>
        <div className='account-content-wrapper cta'>
          <button className='transaction-button'>View transactions</button>
        </div>
      </section>
    </>
  );
};
