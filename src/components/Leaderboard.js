import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '../utils/colorUtils';

function Leaderboard() {
  const users = useSelector((state) => state.users);

  const sortedUsers = Object.values(users).sort(
    (a, b) =>
      (Object.keys(b.answers).length + b.questions.length) -
      (Object.keys(a.answers).length + a.questions.length)
  );

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {sortedUsers.map((user) => (
          <li key={user.id}>
            <Avatar user={user} className="leaderboard-avatar" />
            <div>
              <h3>{user.name}</h3>
              <p>Answered Questions: {Object.keys(user.answers).length}</p>
              <p>Created Questions: {user.questions.length}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard; 