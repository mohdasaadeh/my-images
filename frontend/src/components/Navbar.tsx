import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useTypedSelector } from '../hooks';
import { useActionCreators } from '../hooks';

const Navbar: React.FC = () => {
  const user = useTypedSelector(({ user }) => user.data);

  const { checkUser, deleteUser } = useActionCreators();

  useEffect(() => {
    checkUser();
  }, []);

  const onSignout = () => {
    deleteUser();
  };

  const renderAuth = (className: string): JSX.Element => {
    if (user.id) {
      return (
        <button type="button" className={className} onClick={onSignout}>
          Sign out
        </button>
      );
    } else {
      return (
        <>
          <Link to="/users/signin">
            <button type="button" className={className}>
              Sign In
            </button>
          </Link>
          <Link to="/users/signup">
            <button type="button" className={className}>
              Sign Up
            </button>
          </Link>
        </>
      );
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center text-gray-300">
              MY-MOVIES
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/images"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  Feed
                </Link>

                <a
                  href="/#"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Search
                </a>

                <a
                  href="/#"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Recently Liked
                </a>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {renderAuth(
              'mx-2 bg-gray-800 p-1 rounded-full text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white',
            )}
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="/#"
            className="text-gray-300 hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >
            Feed
          </a>

          <a
            href="/#"
            className="text-gray-300 hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Search
          </a>

          <a
            href="/#"
            className="text-gray-300 hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Recently Liked
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
