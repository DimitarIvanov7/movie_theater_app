import React, { useState } from 'react';
import AuthMenu from './AuthMenu';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrentUser } from '../../features/auth/authSlice';

const Header = ({}) => {
  const [isAuthMenuOpen, setAuthMenuOpen] = useState<Boolean>(false);

  const closeAuth = () => setAuthMenuOpen(false);

  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);

  console.log(user);

  return (
    <div className="w-full ">
      {isAuthMenuOpen && !user ? (
        <AuthMenu closeAuth={closeAuth} />
      ) : (
        <div className="flex w-full justify-between p-4">
          <div>CineRooms</div>
          <div className="flex gap-4">
            <input type="text" placeholder="Find movie..." />
            <button>Search</button>
            {user ? (
              <button onClick={() => dispatch(logout())}>Logout</button>
            ) : (
              <button onClick={() => setAuthMenuOpen(true)}>Login</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
