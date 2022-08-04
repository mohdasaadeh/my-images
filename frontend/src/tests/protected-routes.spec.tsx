import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import Feed from '../pages/Feed';
import RecentlyLiked from '../pages/RecentlyLiked';

jest.mock('../api/auth');
jest.mock('../api/image');

const initialState = {
  user: {
    data: { id: 1 },
    error: null,
    loading: false,
  },
  images: {
    data: [],
    error: null,
    loading: false,
  },
  likedImages: {
    data: [],
    error: null,
    loading: false,
  },
};

function reducer(state = initialState, action: any) {
  return state;
}

describe('Routes and Components Mounting', () => {
  test('Feed page mounts with all components', () => {
    window.history.pushState({}, 'Test Page', '/');

    const store = createStore(reducer);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Feed searchTerm={{ value: '' }} />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getAllByRole('link', { name: /feed/i })[0]).toHaveTextContent(
      /Feed/i,
    );
    expect(
      screen.getByRole('button', { name: /edit profile/i }),
    ).toHaveTextContent(/Edit Profile/i);
    expect(
      screen.getByRole('heading', { name: /recent activities/i }),
    ).toHaveTextContent(/Recent activities/i);

    const { getByTestId } = within(document.getElementById('modal-root')!);

    expect(getByTestId('show-image-add')).toBeInTheDocument();
  });

  test('Recently liked page mounts with all components', () => {
    window.history.pushState({}, 'Test Page', '/recently-liked');

    const store = createStore(reducer);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <RecentlyLiked />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getAllByRole('link', { name: /feed/i })[0]).toHaveTextContent(
      /Feed/i,
    );
  });
});
