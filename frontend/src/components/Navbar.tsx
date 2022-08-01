import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTypedSelector, useAppDispatch } from '../hooks';
import { ImageActionTypes } from '../redux';
import { checkUser, deleteUser } from '../api';

interface NavbarProps {
  setSearchTerm: Function;
}

const Navbar: React.FC<NavbarProps> = ({ setSearchTerm }) => {
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(true);

  const inputRef = useRef<any>();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const user = useTypedSelector(({ user }) => user.data);

  useEffect(() => {
    checkUser(dispatch);
  }, []);

  const onSignout = () => {
    deleteUser(dispatch, navigate);
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
            to="/signin"
            className="hover:text-darkGrayishBlue transition duration-300 ease-in-out"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="hover:text-darkGrayishBlue transition duration-300 ease-in-out"
          >
            Sign Up
          </Link>
        </>
      );
    }
  };

  return (
    <div className="h-20">
      <div className="flex items-center h-full lg:block">
        <div className="fixed w-full p-4 flex bg-primary items-center justify-between">
          <div className="space-x-6 lg:flex">
            <Link
              to="/"
              className="hover:text-darkGrayishBlue transition duration-300 ease-in-out"
            >
              <img src="/logo.png" alt="Logo Image" className="h-12" />
            </Link>
          </div>
          <div className="hidden space-x-6 lg:flex">
            <Link
              to="/"
              className="hover:text-darkGrayishBlue transition duration-300 ease-in-out"
            >
              Feed
            </Link>
            {renderAuth()}
          </div>

          <div className="hidden lg:flex">
            <div className="flex space-x-3">
              <input
                type="text"
                className="flex-1 px-4 rounded-full bg-white focus:outline-none"
                placeholder="Search for images..."
                ref={inputRef}
              />
              <button
                className="px-6 py-2 text-white rounded-full bg-secondary hover:bg-primary 
              hover:text-secondary transition duration-700 ease-in-out 
              border border-slate-400 border-secondary"
                onClick={() => {
                  navigate('/');

                  setSearchTerm({ value: inputRef.current.value });

                  dispatch({
                    type: ImageActionTypes.DELETE_IMAGES_PAGINATED,
                  });
                }}
              >
                Search
              </button>
            </div>
          </div>

          <div className={`flex justify-between mr-3 visible lg:hidden`}>
            <button
              id="menu-btn"
              className="block hamburger lg:hidden focus:outline-none"
              onClick={() => setIsMobileMenuShown(!isMobileMenuShown)}
            >
              <span className="hamburger-top"></span>
              <span className="hamburger-middle"></span>
              <span className="hamburger-bottom"></span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <div
          id="menu"
          className={`${
            isMobileMenuShown && 'hidden'
          } animate-fadeIn fixed flex flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center top-10 left-6 right-4 drop-shadow-md lg:hidden`}
        >
          <Link to="/">Feed</Link>
          {renderAuth()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
