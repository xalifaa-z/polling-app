import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [selectedUser, setSelectedUser] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const users = useSelector((state) => state.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users[selectedUser];
    dispatch(setUser(user));
    
    const from = location.state?.from || "/";
    navigate(from);
  };

  return (
    <div className="login-container">
      <h2>Welcome to the Would You Rather App</h2>
      <p>Please sign in to continue</p>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          required
        >
          <option value="">Select User</option>
          {Object.values(users).map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit" disabled={!selectedUser}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
