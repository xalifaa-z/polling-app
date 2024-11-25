import React from 'react';
import { useNavigate } from 'react-router-dom';

function PollList({ polls }) {
  const navigate = useNavigate();

  const handlePollClick = (pollId) => {
    navigate(`/questions/${pollId}`);
  };

  return (
    <ul className="poll-list">
      {polls.map((poll) => (
        <li 
          key={poll.id} 
          onClick={() => handlePollClick(poll.id)}
          className="poll-item"
        >
          <div className="poll-content">
            <h3>Would You Rather</h3>
            <p>... {poll.optionOne.text} or ...</p>
            <button 
              className="view-poll-button"
              onClick={(e) => {
                e.stopPropagation();
                handlePollClick(poll.id);
              }}
            >
              View Poll
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PollList; 