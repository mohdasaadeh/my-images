import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import Signin from '../pages/Signin';
import { fetchUser } from '../api/auth';

jest.mock('../api/auth');

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

test('Signin submits the filled data', async () => {
  const testData = {
    email: 'mohammad@test.com',
    password: '123',
  };

  const store = createStore(reducer);

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Signin />
      </BrowserRouter>
    </Provider>,
  );

  userEvent.type(await screen.findByPlaceholderText(/Email/i), testData.email);
  userEvent.type(
    await screen.findByPlaceholderText(/Password/i),
    testData.password,
  );

  await act(async () => {
    userEvent.click(
      await screen.findByText(/Sign in/i, { selector: 'button' }),
    );
  });

  expect(fetchUser).toHaveBeenCalledTimes(1);
});
