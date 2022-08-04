import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary">
      <div className="container flex justify-between px-6 mx-auto md:flex-row md:space-y-0">
        <div className="flex items-center justify-between md:space-y-0 md:items-start">
          <div className="mx-auto my-6 w-full text-center text-black">
            Copyright &copy; 2022, All Rights Reserved
          </div>
        </div>

        <div className="flex flex-row justify-around">
          <div className="flex space-x-12 text-black">
            <Link
              to="/"
              className="mx-auto my-6 hover:text-darkGrayishBlue transition duration-300 ease-in-out"
            >
              Feed
            </Link>
            <Link
              to="/signin"
              className="mx-auto my-6 hover:text-darkGrayishBlue transition duration-300 ease-in-out"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="hidden mx-auto my-6 text-black md:block">
            Copyright &copy; 2022, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
