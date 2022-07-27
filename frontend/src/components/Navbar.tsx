import { useEffect } from 'react';

import StyledNavbar from './Navbar.styles';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActionCreators } from '../hooks/useActionCreators';

const Navbar: React.FC = () => {
  const user = useTypedSelector(({ user }) => user.data);

  const { checkUser } = useActionCreators();

  useEffect(() => {
    checkUser();
  }, []);

  const renderAuth = (className: string): JSX.Element => {
    if (user.id) {
      return (
        <button type="button" className={className}>
          Log out
        </button>
      );
    } else {
      return (
        <>
          <button type="button" className={className}>
            Sign In
          </button>
          <button type="button" className={className}>
            Sign Up
          </button>
        </>
      );
    }
  };

  return <StyledNavbar renderAuth={renderAuth} />;
};

export default Navbar;
