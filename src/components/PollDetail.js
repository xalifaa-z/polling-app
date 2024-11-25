import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { saveQuestionAnswer } from '../features/questions/questionsSlice';
import CountdownTimer from './CountdownTimer';

function PollDetail() {
  const { question_id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const question = useSelector((state) => state.questions[question_id]);
  const authUser = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.users);

  if (!question) {
    return <h2>404: Poll Not Found</h2>;
  }

  const hasAnswered = Object.keys(users[authUser.id].answers).includes(question_id);
  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;

  const handleVote = async (option) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await dispatch(saveQuestionAnswer({
        authedUser: authUser.id,
        qid: question_id,
        answer: option
      })).unwrap();
      setShowCountdown(true);
    } catch (error) {
      console.error('Failed to save answer:', error);
      setIsSubmitting(false);
    }
  };

  const handleCountdownComplete = () => {
    navigate('/');
  };

  const handleBack = () => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (hasAnswered) {
      navigate('/?tab=answered');
    } else {
      navigate(tab ? `/?tab=${tab}` : '/');
    }
  };

  return (
    <div className="poll-detail">
      <button 
        onClick={handleBack} 
        className="back-button"
      >
        ← Back
      </button>
      <h3>Would You Rather</h3>
      {!hasAnswered ? (
        <div className="options">
          <button
            onClick={() => handleVote('optionOne')}
            className="option-button"
            disabled={isSubmitting}
          >
            {question.optionOne.text}
          </button>
          <button
            onClick={() => handleVote('optionTwo')}
            className="option-button"
            disabled={isSubmitting}
          >
            {question.optionTwo.text}
          </button>
        </div>
      ) : (
        <div className="results">
          <div className={users[authUser.id].answers[question_id] === 'optionOne' ? 'selected' : ''}>
            <p>{question.optionOne.text}</p>
            <p>
              {question.optionOne.votes.length} votes 
              ({((question.optionOne.votes.length / totalVotes) * 100).toFixed(2)}%)
            </p>
          </div>
          <div className={users[authUser.id].answers[question_id] === 'optionTwo' ? 'selected' : ''}>
            <p>{question.optionTwo.text}</p>
            <p>
              {question.optionTwo.votes.length} votes 
              ({((question.optionTwo.votes.length / totalVotes) * 100).toFixed(2)}%)
            </p>
          </div>
          {showCountdown && (
            <div className="countdown-container">
              <p>Redirecting to home page in</p>
              <CountdownTimer seconds={10} onComplete={handleCountdownComplete} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PollDetail;
