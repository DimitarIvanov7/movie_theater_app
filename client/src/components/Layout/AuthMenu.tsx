import React, { useState } from 'react';
import { AuthType } from '../../types';

import { useDispatch, useSelector } from 'react-redux';
import Input from '../Common/Input';
import {
  useLoginMutation,
  useSingUpMutation,
} from '../../features/auth/authApiSlice';

import {
  User,
  selectCurrentUser,
  setCredentials,
} from '../../features/auth/authSlice';

interface Props {
  closeAuth(): void;
}

const AuthMenu = ({ closeAuth }: Props) => {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);

  const [singup, singUpStatus] = useSingUpMutation();

  const [login, loginStatus] = useLoginMutation();

  const [authType, setAuthType] = useState<AuthType>(AuthType.SignIn);

  const [name, setName] = useState('');

  const [password, setPassword] = useState('');

  const [email, setEmail] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const clearInputs = () => {
    setName('');
    setPassword('');
    setEmail('');
  };

  const handleAuthentication = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: AuthType
  ) => {
    e.preventDefault();

    try {
      const userData =
        type === AuthType.SignUp
          ? await singup({ name, password, email }).unwrap()
          : await login({ name, password }).unwrap();

      console.log(userData);

      if (userData?.status >= 400) {
        throw new Error(userData.message);
      }

      dispatch(setCredentials(userData));
      clearInputs();
    } catch (e: any) {
      console.log(e);
      setErrorMsg(e.data?.message || 'An error has occured');
    }
  };

  const handleAuthorizationFrom = () => {
    authType === AuthType.SignUp
      ? setAuthType(AuthType.SignIn)
      : setAuthType(AuthType.SignUp);
  };

  return (
    <div className=" bg-primary p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <h2>
          {authType === AuthType.SignUp
            ? 'Create account'
            : 'Log into your account'}
        </h2>
        <button onClick={closeAuth}>X</button>
      </div>

      <div>
        <form className="w-2/3 flex gap-2 flex-wrap">
          <Input label={'Username'} value={name} onChange={setName} />

          {authType == AuthType.SignUp && (
            <Input label={'Email'} value={email} onChange={setEmail} />
          )}

          <Input label={'Password'} value={password} onChange={setPassword} />

          {authType === AuthType.SignUp ? (
            <button onClick={(e) => handleAuthentication(e, AuthType.SignUp)}>
              Create account
            </button>
          ) : (
            <button onClick={(e) => handleAuthentication(e, AuthType.SignIn)}>
              Login
            </button>
          )}
        </form>
      </div>

      <div className="flex w-1/3 gap-2">
        <button onClick={handleAuthorizationFrom}>
          {authType === AuthType.SignUp ? 'Sing in' : 'Sign up'}
        </button>

        {errorMsg && !user && <p className="text-red-400">{errorMsg}</p>}
      </div>
    </div>
  );
};

export default AuthMenu;
