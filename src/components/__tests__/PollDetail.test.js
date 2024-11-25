import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PollDetail from '../PollDetail';

const mockStore = configureStore([]);

describe('PollDetail Component', () => {
  it('should calculate and display vote percentages correctly', () => {
    const store = mockStore({
      questions: {
        'question1': {
          id: 'question1',
          author: 'sarahedo',
          timestamp: 1467166872634,
          optionOne: {
            votes: ['sarahedo'],
            text: 'Build our new application with Javascript',
          },
          optionTwo: {
            votes: ['tylermcginnis'],
            text: 'Build our new application with Typescript'
          }
        }
      },
      users: {
        sarahedo: {
          id: 'sarahedo',
          answers: { 'question1': 'optionOne' }
        }
      },
      auth: {
        user: { id: 'sarahedo' }
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/questions/question1']}>
          <Routes>
            <Route path="/questions/:question_id" element={<PollDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Test for specific option text and its corresponding vote count
    const optionOneText = screen.getByText('Build our new application with Javascript');
    const optionOneVotes = optionOneText.parentElement.querySelector('p:last-child');
    expect(optionOneVotes).toHaveTextContent('1 votes (50.00%)');

    const optionTwoText = screen.getByText('Build our new application with Typescript');
    const optionTwoVotes = optionTwoText.parentElement.querySelector('p:last-child');
    expect(optionTwoVotes).toHaveTextContent('1 votes (50.00%)');

    // Verify that the selected option has the correct class
    expect(optionOneText.parentElement).toHaveClass('selected');
    expect(optionTwoText.parentElement).not.toHaveClass('selected');
  });
}); 