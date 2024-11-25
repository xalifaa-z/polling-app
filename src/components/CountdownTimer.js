import React, { useEffect, useState } from 'react';

function CountdownTimer({ seconds, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = ((seconds - timeLeft) / seconds) * circumference;

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  return (
    <div className="countdown-timer">
      <svg width="60" height="60" style={{ transform: 'rotate(-90deg)' }}>
        <circle
          stroke="#e0e0e0"
          fill="none"
          strokeWidth="4"
          r={radius}
          cx="30"
          cy="30"
        />
        <circle
          stroke="#3498db"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={radius}
          cx="30"
          cy="30"
          style={{
            transition: 'stroke-dashoffset 1s linear'
          }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fill="#2c3e50"
          fontSize="16"
          style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}
        >
          {timeLeft}
        </text>
      </svg>
    </div>
  );
}

export default CountdownTimer; 