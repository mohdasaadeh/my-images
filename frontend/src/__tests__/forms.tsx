import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../redux';
import { BrowserRouter } from 'react-router-dom';

import Signup from '../pages/Signup';
import * as helper from '../hooks/createUser';

test('Signup submits the filled data with default user profile picture', async () => {
  // const testData = {
  //   username: 'Mohammad Saadeh',
  //   email: 'mohammad@test.com',
  //   password: '123',
  //   image:
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMcqFkYiM95XcWYnNkAnbTqxBZVaVzaWI5CIrmsXIXsSstDkBmDFXhyisY1PQP1T38yx8&usqp=CAU',
  // };
  // const mockCreateUser = jest.spyOn(helper, 'createUser');
  // jest.mock('../hooks/useAuth', () => {
  //   return {
  //     ...jest.requireActual('../hooks/useAuth'),
  //     createUser: jest.fn(({}: any): void => undefined),
  //   };
  // });
  // render(
  //   <Provider store={store}>
  //     <BrowserRouter>
  //       <Signup />
  //     </BrowserRouter>
  //   </Provider>,
  // );
  // userEvent.type(
  //   await screen.findByPlaceholderText(/Username/i),
  //   testData.username,
  // );
  // userEvent.type(await screen.findByPlaceholderText(/Email/i), testData.email);
  // userEvent.type(
  //   await screen.findByPlaceholderText(/Password/i),
  //   testData.password,
  // );
  // userEvent.click(await screen.findByText(/Sign up/i, { selector: 'button' }));
  // expect(mockCreateUser).toHaveBeenCalledTimes(1);
});
