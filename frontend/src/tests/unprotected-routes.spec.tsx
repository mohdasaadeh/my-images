import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import Signup from '../pages/Signup';
import Signin from '../pages/Signin';

jest.mock('../api/auth');
jest.mock('../api/image');

const initialState = {
  user: {
    data: { id: 'out' },
    error: null,
    loading: false,
  },
};

function reducer(state = initialState, action: any) {
  return state;
}

describe('Routes and Components Mounting', () => {
  test('Sign up page mounts with username, email, password fields, and sign up button', () => {
    window.history.pushState({}, 'Test Page', '/signup');

    const store = createStore(reducer);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/username/i)).toHaveTextContent(/username/i);
    expect(screen.getByText(/email/i)).toHaveTextContent(/email/i);
    expect(screen.getByText(/password/i)).toHaveTextContent(/password/i);
    expect(screen.getByRole('button', { name: /sign up/i })).toHaveTextContent(
      /sign up/i,
    );
  });

  test('Sign in page mounts with email, password fields, and sign in button', () => {
    window.history.pushState({}, 'Test Page', '/signin');

    const store = createStore(reducer);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Signin />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/email/i)).toHaveTextContent(/email/i);
    expect(screen.getByText(/password/i)).toHaveTextContent(/password/i);
    expect(screen.getByRole('button', { name: /sign in/i })).toHaveTextContent(
      /sign in/i,
    );
  });
});
