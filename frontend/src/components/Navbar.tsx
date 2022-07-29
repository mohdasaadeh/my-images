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

  const renderAuth = (): JSX.Element => {
    if (user.id !== 'out') {
      return (
        <button
          onClick={onSignout}
          className="hover:text-darkGrayishBlue transition duration-300 ease-in-out"
        >
          Sign Out
        </button>
      );
    } else {
      return (
        <>
          <Link
            to="/users/signin"
            className="hover:text-darkGrayishBlue transition duration-300 ease-in-out"
          >
            Sign In
          </Link>
          <Link
            to="/users/signup"
            className="hover:text-darkGrayishBlue transition duration-300 ease-in-out"
          >
            Sign Up
          </Link>
        </>
      );
    }
  };

  return (
    <div>
      <div>
        <div className="fixed w-full p-4 flex bg-primary items-center justify-between">
          <div className="pt-2">
            <img src="./img/logo.svg" alt="" />
          </div>
          <div className="hidden space-x-6 lg:flex">
            <a
              href="#"
              className="hover:text-darkGrayishBlue transition duration-300 ease-in-out"
            >
              My Images
            </a>
            <a
              href="#"
              className="hover:text-darkGrayishBlue transition duration-300 ease-in-out"
            >
              Recently Liked
            </a>
            <a
              href="#"
              className="hover:text-darkGrayishBlue transition duration-300 ease-in-out"
            >
              Search in web
            </a>
            {renderAuth()}
          </div>

          <form>
            <div className="hidden flex lg:flex space-x-3">
              <input
                type="text"
                className="flex-1 px-4 rounded-full bg-white focus:outline-none"
                placeholder="Search for images..."
              />
              <button
                className="px-6 py-2 text-white rounded-full bg-secondary hover:bg-primary 
              hover:text-secondary transition duration-700 ease-in-out 
              border border-slate-400 border-secondary"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="flex justify-end ">
          <button
            id="menu-btn"
            className="block hamburger lg:hidden focus:outline-none"
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
      </div>

      <div className="md:hidden">
        <div
          id="menu"
          className="absolute flex flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
        >
          <a href="#">My Images</a>
          <a href="#">Login</a>
          <a href="#">Search in web</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
