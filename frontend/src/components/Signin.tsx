import { Link } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';

import AuthForm from './AuthForm';
import { Inputs } from './AuthForm';
import { useActionCreators } from '../hooks/useActionCreators';

const Signin: React.FC = () => {
  const { fetchUser } = useActionCreators();

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

  const onSubmit: SubmitHandler<Inputs> = (data) => fetchUser(data);

  return (
    <AuthForm action="Sign in" renderTitle={renderTitle} onSubmit={onSubmit} />
  );
};

export default Signin;
