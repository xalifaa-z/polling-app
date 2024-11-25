import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Leaderboard from '../Leaderboard';

const mockStore = configureStore([]);

// Test 9: Verify leaderboard display
describe('Leaderboard Component', () => {
  it('should display correct user stats', () => {
    const store = mockStore({
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: 'sarah.jpg',
          answers: { '1': 'optionOne', '2': 'optionTwo' },
          questions: ['3', '4']
        }
      }
    });

    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    expect(screen.getByText('Sarah Edo')).toBeInTheDocument();
    expect(screen.getByText('Answered Questions: 2')).toBeInTheDocument();
    expect(screen.getByText('Created Questions: 2')).toBeInTheDocument();
  });
}); 