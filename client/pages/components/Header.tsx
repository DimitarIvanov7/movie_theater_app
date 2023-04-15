import React from "react";

const Header = ({}) => {
  return (
    <div className="flex justify-between">
      <div>CineRooms</div>
      <div>
        <input type="text" placeholder="Find movie..." />
        <button>Search</button>
        <button>Login</button>
      </div>
    </div>
  );
};

export default Header;
