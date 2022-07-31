import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '../redux';
import App from '../App';

describe('Routes and Components Mounting', () => {
  test('Feed page mounts with all components', () => {
    window.history.pushState({}, 'Test Page', '/');

    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getAllByRole('link', { name: /feed/i })[0]).toHaveTextContent(
      /Feed/i,
    );
    expect(
      screen.getAllByRole('link', { name: /search in web/i })[0],
    ).toHaveTextContent(/Search in web/i);
    expect(
      screen.getByRole('button', { name: /edit profile/i }),
    ).toHaveTextContent(/Edit Profile/i);
    expect(
      screen.getByRole('heading', { name: /recent activities/i }),
    ).toHaveTextContent(/Recent activities/i);

    const { getByTestId } = within(document.getElementById('modal-root')!);

    expect(getByTestId('show-profile-edit')).toBeInTheDocument();
  });

  test('Recently liked page mounts with all components', () => {
    window.history.pushState({}, 'Test Page', '/recently-liked');

    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getAllByRole('link', { name: /feed/i })[0]).toHaveTextContent(
      /Feed/i,
    );
    expect(
      screen.getByRole('button', { name: /edit profile/i }),
    ).toHaveTextContent(/Edit Profile/i);
  });

  test('Sign up page mounts with username, email, password fields, and sign up button', () => {
    window.history.pushState({}, 'Test Page', '/signup');

    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
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

    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
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
