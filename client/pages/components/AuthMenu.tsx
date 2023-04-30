import React, { useState } from "react";
import { AuthType } from "../models/Auth";

interface Props {
  closeAuth: { (): void };
}

const AuthMenu = ({ closeAuth }: Props) => {
  const [authType, setAuthType] = useState<AuthType>(AuthType.SignIn);

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
        <div className="w-2/3 flex gap-2 flex-wrap">
          <div className="flex gap-2">
            <label htmlFor="username">Username:</label>
            <input name="username" type="text" />
          </div>

          {authType == AuthType.SignUp && (
            <div className="flex gap-2">
              <label htmlFor="email">Email:</label>
              <input name="email" type="text" />
            </div>
          )}
          <div className="flex gap-2">
            <label htmlFor="password">Password:</label>
            <input name="password" type="text" />
          </div>

          {authType == AuthType.SignUp && (
            <div className="flex gap-2">
              <label htmlFor="repeat-password">Repeat password:</label>
              <input name="repeat-password" type="text" />
            </div>
          )}
        </div>

        <button>
          {authType === AuthType.SignUp ? "Create account" : "Login"}
        </button>
      </div>

      <div className="flex w-1/3 gap-2">
        <button onClick={() => setAuthType(AuthType.SignUp)}>Sing up</button>
        <span>|</span>
        <button onClick={() => setAuthType(AuthType.SignIn)}>Sign in</button>
      </div>
    </div>
  );
};

export default AuthMenu;
