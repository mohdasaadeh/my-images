const Footer: React.FC = () => {
  return (
    <footer className="bg-veryDarkBlue">
      <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
        <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start">
          <div className="mx-auto my-6 text-center text-white md:hidden">
            Copyright &copy; 2022, All Rights Reserved
          </div>
          <div>
            <img src="./img/logo-white.svg" className="h-8" alt="" />
          </div>
        </div>

        <div className="flex flex-row justify-around space-x-32">
          <div className="flex space-x-12 text-white">
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
              Login
            </a>
            <a
              href="#"
              className="hover:text-darkGrayishBlue transition duration-300 ease-in-out"
            >
              Search on web
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="hidden text-white md:block">
            Copyright &copy; 2022, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
