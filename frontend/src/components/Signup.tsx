import AuthForm from './AuthForm';

const Signup: React.FC = () => {
  const renderTitle = (
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign up
      </h2>
    </div>
  );

  return <AuthForm action="Sign up" renderTitle={renderTitle} />;
};

export default Signup;
