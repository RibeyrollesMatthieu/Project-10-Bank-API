import { Cta } from '@components/standalone/Cta';
import { Input } from '@components/standalone/Input';
import { signinUser } from '@redux/actions/auth/signin';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SigninPage = () => {
  /* States */
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  /* Redux */
  const { success, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  /* Router */
  const navigate = useNavigate();

  useEffect(() => {
    if (success) navigate('/profile');
  }, [navigate, success]);

  const isSubmittable = useMemo(() => {
    if (!email || !email.trim().length) return false;
    if (!password || !password.trim().length) return false;

    return true;
  }, [password, email]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!isSubmittable) return;

      dispatch(signinUser({ email, password, rememberMe }));
    },
    [isSubmittable, dispatch, email, password, rememberMe]
  );

  if (success) return <></>;

  return (
    <>
      <main className='main bg-dark' onSubmit={handleSubmit}>
        <section className='sign-in-content'>
          <i className='fa fa-user-circle sign-in-icon'></i>
          <h1>Sign In</h1>

          <form>
            <Input type='email' label='Email' value={email} setValue={setEmail} />
            <Input type='password' label='Password' value={password} setValue={setPassword} />
            <Input
              isInline
              type='checkbox'
              label='Remember me'
              checked={rememberMe}
              setValue={setRememberMe}
            />

            {error && <span className='error'> {error}</span>}

            <Cta label='Sign In' disabled={!isSubmittable} />
          </form>
        </section>
      </main>
    </>
  );
};
