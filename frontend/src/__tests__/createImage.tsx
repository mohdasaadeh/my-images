import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '../redux';
import * as createImageHelper from '../api/image/createImage';
import App from '../App';

test('Add image submits the filled data', async () => {
  const someValues = [{ name: 'mohammad saadeh' }];
  const str = JSON.stringify(someValues);
  const blob = new Blob([str]);
  const file = new File([blob], 'values.json', {
    type: 'application/JSON',
  });
  File.prototype.text = jest.fn().mockResolvedValueOnce(str);

  const createImageMock = jest.spyOn(createImageHelper, 'createImage');

  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );

  const { getByTestId } = within(document.getElementById('modal-root')!);

  const fileInput = getByTestId('image-add-file');

  userEvent.upload(fileInput, file);

  userEvent.type(getByTestId('image-add-title'), 'new image');
  userEvent.type(getByTestId('image-add-description'), 'new image description');

  await act(async () => {
    userEvent.click(getByTestId('image-add-submit'));
  });

  expect(createImageMock).toHaveBeenCalledTimes(1);
});
