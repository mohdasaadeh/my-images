import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import Signup from '../pages/Signup';
import { createUser } from '../api/auth';

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

test('Signup submits the filled data with default user profile picture', async () => {
  const testData = {
    username: 'Mohammad Saadeh',
    email: 'mohammad@test.com',
    password: '123',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMcqFkYiM95XcWYnNkAnbTqxBZVaVzaWI5CIrmsXIXsSstDkBmDFXhyisY1PQP1T38yx8&usqp=CAU',
  };

  const store = createStore(reducer);

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </Provider>,
  );

  userEvent.type(
    await screen.findByPlaceholderText(/Username/i),
    testData.username,
  );
  userEvent.type(await screen.findByPlaceholderText(/Email/i), testData.email);
  userEvent.type(
    await screen.findByPlaceholderText(/Password/i),
    testData.password,
  );

  await act(async () => {
    userEvent.click(
      await screen.findByText(/Sign up/i, { selector: 'button' }),
    );
  });

  expect(createUser).toHaveBeenCalledTimes(1);
});
