import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Avatar } from "../utils/colorUtils";

function Nav() {
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "active" : ""}
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/add" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Add Poll
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/leaderboard" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Leaderboard
          </NavLink>
        </li>
      </ul>
      {authUser && (
        <div className="user-info">
          <Avatar user={authUser} className="nav-avatar" />
          <span>{authUser.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
