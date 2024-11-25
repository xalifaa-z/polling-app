import React from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import PollList from './PollList';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const showUnanswered = searchParams.get('tab') !== 'answered';
  
  const authUser = useSelector((state) => state.auth.user);
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);

  if (!users || !authUser || !users[authUser.id]) {
    return <div>Loading...</div>;
  }

  const answeredIds = Object.keys(users[authUser.id].answers);
  const answered = Object.values(questions)
    .filter((q) => answeredIds.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter((q) => !answeredIds.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="home-container">
      <div className="toggle-buttons">
        <button 
          onClick={() => setSearchParams({})} 
          className={showUnanswered ? 'active' : ''}
        >
          Unanswered Polls
        </button>
        <button 
          onClick={() => setSearchParams({ tab: 'answered' })} 
          className={!showUnanswered ? 'active' : ''}
        >
          Answered Polls
        </button>
      </div>
      {showUnanswered && unanswered.length === 0 ? (
        <div className="no-polls-message">
          <p>You have answered all the polls! 🎉</p>
          <p>Check back later for new polls or create your own!</p>
        </div>
      ) : !showUnanswered && answered.length === 0 ? (
        <div className="no-polls-message">
          <p>You haven't answered any polls yet! 📝</p>
          <p>Go to Unanswered Polls to start voting!</p>
        </div>
      ) : (
        <PollList polls={showUnanswered ? unanswered : answered} />
      )}
    </div>
  );
}

export default Home; 