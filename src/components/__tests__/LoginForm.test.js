import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from '../Login';

const mockStore = configureStore([]);

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Login Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: null,
        },
        tylermcginnis: {
          id: 'tylermcginnis',
          name: 'Tyler McGinnis',
          avatarURL: null,
        }
      },
      auth: { user: null }
    });
    mockedNavigate.mockClear();
  });

  it('should render login form with all required elements', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Check for static elements
    expect(screen.getByText(/Would You Rather/i)).toBeInTheDocument();
    expect(screen.getByText(/Please sign in/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();

    // Check for user options
    expect(screen.getByText('Sarah Edo')).toBeInTheDocument();
    expect(screen.getByText('Tyler McGinnis')).toBeInTheDocument();
  });
}); 