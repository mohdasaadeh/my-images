import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useAppDispatch, useTypedSelector } from '../hooks';
import { fetchUser } from '../api';
import ErrorBanner from '../components/ErrorBanner';

type Inputs = {
  email: string;
  password: string;
};

const Signin: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const error = useTypedSelector(({ user }) => user.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    fetchUser(data, dispatch, navigate);

  return (
    <div className="lg:flex">
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-12 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <div className="pt-2">
              <img src="/logo.png" alt="Logo Image" />
            </div>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-info-dark font-display lg:text-left xl:text-5xl
                    xl:text-bold"
          >
            Sign In
          </h2>
          {error && (
            <div className="mt-4">
              <ErrorBanner error={error} />
            </div>
          )}
          <div className="mt-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-info-dark"
                  type="email"
                  placeholder="Email"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-info-dark"
                  type="password"
                  placeholder="Password"
                  {...register('password', { required: true })}
                />
                {errors.password && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="mt-10">
                <button
                  className="bg-secondary hover:bg-primary text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:text-secondary
                                shadow-lg transition duration-700 ease-in-out border border-slate-400 border-secondary"
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className="mt-12 text-sm font-display text-gray-700 text-center">
              You don't have an account?{' '}
              <Link
                to="/signup"
                className="cursor-pointer text-info-dark hover:text-info-light"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-info-background flex-1 h-screen">
        <div className="max-w-lg transform duration-200 hover:scale-110 cursor-pointer">
          <img src="/login.jpg" alt="Login Image" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
