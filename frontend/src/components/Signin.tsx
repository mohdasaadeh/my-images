import { Link } from 'react-router-dom';

import AuthForm from './AuthForm';

const Signin: React.FC = () => {
  const renderTitle = (
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or{' '}
        <Link
          to="/users/signup"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          sign up if you don't have any
        </Link>
      </p>
    </div>
  );

  return <AuthForm action="Sign in" renderTitle={renderTitle} />;
};

export default Signin;
