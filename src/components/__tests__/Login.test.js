import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from 'redux-thunk';
import Login from "../Login";

// Create mock store with thunk middleware
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Mock initial state
const initialState = {
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
  auth: { 
    user: null,
    error: null 
  }
};

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe("Login Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    mockedNavigate.mockClear();
  });

  it("should render login form with all required elements", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Check for required elements
    expect(screen.getByText(/Would You Rather/i)).toBeInTheDocument();
    expect(screen.getByText(/Please sign in to continue/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Sarah Edo')).toBeInTheDocument();
    expect(screen.getByText('Tyler McGinnis')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it("should enable submit button when user is selected", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'sarahedo' } });
    
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it("should handle user selection and navigation", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Select a user and submit
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'sarahedo' } });
    fireEvent.submit(screen.getByRole('button'));

    // Check if correct action was dispatched
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'auth/setUser',
      payload: initialState.users.sarahedo
    });

    // Check if navigation occurred
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });

  it("should handle empty selection", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
  });
});
