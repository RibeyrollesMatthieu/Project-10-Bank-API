import { useAppSelector } from '@redux/hooks';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  // redux
  const { userInfo, success } = useAppSelector((state) => state.auth);

  return (
    <nav className='main-nav'>
      <NavLink className='main-nav-logo' to='/'>
        <img className='main-nav-logo-image' src='/argentBankLogo.png' alt='Argent Bank Logo' />
        <h1 className='sr-only'>Argent Bank</h1>
      </NavLink>

      {!success && (
        <div>
          <NavLink className='main-nav-item' to='/signin'>
            <i className='fa fa-user-circle'></i>
            Sign In
          </NavLink>
        </div>
      )}

      {success && (
        <div>
          {userInfo?.firstName && (
            <NavLink className='main-nav-item' to='/profile'>
              <i className='fa fa-user-circle'></i>
              {userInfo.firstName}
            </NavLink>
          )}

          <a className='main-nav-item' href='/signout'>
            <i className='fa fa-sign-out'></i>
            Sign Out
          </a>
        </div>
      )}
    </nav>
  );
};
