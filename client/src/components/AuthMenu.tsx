import React, { useState } from 'react';
import { AuthType, SingUpData, SingInData } from '../types';

import { connect, useDispatch, useSelector } from 'react-redux';
import { AppState } from '../features/store/store';
import Input from './Input';
import { useSingUpMutation } from '../features/auth/authApiSlice';

import {
  User,
  selectCurrentUser,
  setCredentials,
} from '../features/auth/authSlice';

interface Props {
  closeAuth(): void;
  user: User;
}

const AuthMenu = ({ closeAuth, user }: Props) => {
  const dispatch = useDispatch();

  // const [login, { isLoading }] = useLoginMutation()

  const currentUser = useSelector(selectCurrentUser);

  console.log(currentUser);

  console.log(user);

  const [singup, { isLoading }] = useSingUpMutation();

  const [authType, setAuthType] = useState<AuthType>(AuthType.SignIn);

  const [name, setName] = useState('');

  const [password, setPassword] = useState('');

  const [passwordRepeat, setPasswordRepat] = useState('');

  const [email, setEmail] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const clearInputs = () => {
    setName('');
    setPassword('');
    setEmail('');
  };

  const handleCreateAccount = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const userData = await singup({ name, password, email });

      if (userData.error) {
        setErrorMsg(userData.error.data.message);

        return;
      }
      dispatch(setCredentials({ ...userData }));
      clearInputs();
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleSignIn = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // dispatch(login({ name, password }));
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

          {authType == AuthType.SignUp && (
            <Input
              label={'Repeat password'}
              value={passwordRepeat}
              onChange={setPasswordRepat}
            />
          )}
          {authType === AuthType.SignUp ? (
            <button onClick={handleCreateAccount}>Create account</button>
          ) : (
            <button onClick={handleSignIn}>Login</button>
          )}
        </form>
      </div>

      <div className="flex w-1/3 gap-2">
        <button onClick={handleAuthorizationFrom}>
          {authType === AuthType.SignUp ? 'Sing in' : 'Sign up'}
        </button>
        <p className="text-red-400">
          {errorMsg && !user && <div>{errorMsg}</div>}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    user: selectCurrentUser(state),
  };
};

export default connect(mapStateToProps)(AuthMenu);
