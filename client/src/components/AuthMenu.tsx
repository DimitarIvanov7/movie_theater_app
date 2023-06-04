import React, { useState } from "react";
import {
  AuthType,
  SingUpData,
  ActionRequestConfing,
  SingInData,
} from "../types";
import {
  User,
  createAccount,
  login,
  selectAuthState,
} from "../store/authSlice";

import { connect, useDispatch, useSelector } from "react-redux";
import { AppState } from "../store/store";
import Input from "./Input";
import { ActionCreatorWithPayload, PayloadAction } from "@reduxjs/toolkit";
import { apiCallBegan } from "../store/api";

interface Props {
  closeAuth(): void;
  user: User;
}

interface DispatchProps {
  createAccount: (payload: SingUpData) => ReturnType<typeof apiCallBegan>;
  login: (payload: SingInData) => ReturnType<typeof apiCallBegan>;
}

const AuthMenu = ({
  closeAuth,
  user,
  createAccount,
  login,
}: Props & DispatchProps) => {
  const dispatch = useDispatch();

  const [authType, setAuthType] = useState<AuthType>(AuthType.SignIn);

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

  const [passwordRepeat, setPasswordRepat] = useState("");

  const [email, setEmail] = useState("");

  const handleCreateAccount = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(createAccount({ name, password, email }));
  };

  const handleSignIn = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(login({ name, password }));
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
            ? "Create account"
            : "Log into your account"}
        </h2>
        <button onClick={closeAuth}>X</button>
      </div>

      <div>
        <form className="w-2/3 flex gap-2 flex-wrap">
          <Input label={"Username"} value={name} onChange={setName} />

          {authType == AuthType.SignUp && (
            <Input label={"Email"} value={email} onChange={setEmail} />
          )}

          <Input label={"Password"} value={password} onChange={setPassword} />

          {authType == AuthType.SignUp && (
            <Input
              label={"Repeat password"}
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
          {authType === AuthType.SignUp ? "Sing in" : "Sign up"}
        </button>
        <p className="text-red-400">
          {!!user.error && Array.isArray(user.error)
            ? user.error[0]
            : user.error}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    user: selectAuthState(state),
  };
};

const mapDispatchToProps = {
  createAccount: createAccount,
  login: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthMenu);
