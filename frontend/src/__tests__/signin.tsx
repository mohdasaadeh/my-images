import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '../redux';
import * as fetchUserHelper from '../api/auth/fetchUser';
import Signin from '../pages/Signin';

test('Signin submits the filled data', async () => {
  const testData = {
    email: 'mohammad@test.com',
    password: '123',
  };

  const fetchUserMock = jest.spyOn(fetchUserHelper, 'fetchUser');

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

  expect(fetchUserMock).toHaveBeenCalledTimes(1);
});
