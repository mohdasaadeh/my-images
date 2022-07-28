import { SubmitHandler } from 'react-hook-form';

import AuthForm, { Inputs } from '../components/AuthForm';
import { useActionCreators } from '../hooks';

const Signup: React.FC = () => {
  const { createUser } = useActionCreators();

  const renderTitle = (
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign up
      </h2>
    </div>
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => createUser(data);

  return (
    <AuthForm action="Sign up" renderTitle={renderTitle} onSubmit={onSubmit} />
  );
};

export default Signup;
