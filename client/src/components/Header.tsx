import React, { useState } from "react";
import AuthMenu from "./AuthMenu";

const Header = ({}) => {
  const [isAuthMenuOpen, setAuthMenuOpen] = useState<Boolean>(false);

  const closeAuth = () => setAuthMenuOpen(false);

  return (
    <div className=" w-full">
      {isAuthMenuOpen ? (
        <AuthMenu closeAuth={closeAuth} />
      ) : (
        <div className="flex w-full justify-between">
          <div>CineRooms</div>
          <div>
            <input type="text" placeholder="Find movie..." />
            <button>Search</button>
            <button onClick={() => setAuthMenuOpen(true)}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
