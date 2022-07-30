import { useState } from 'react';

import { useTypedSelector } from '../hooks';
import EditUser from '../modals/EditUser';

interface UserCardProps {
  setIsAddImageHidden: Function;
}

const UserCard: React.FC<UserCardProps> = ({ setIsAddImageHidden }) => {
  const [isHidden, setIsHidden] = useState(true);

  const user = useTypedSelector(({ user }) => user.data);

  return (
    <>
      <div
        className="flex flex-col mt-10 items-center w-auto justify-between space-y-12 lg:flex-col lg:space-y-0
           lg:items-start"
      >
        <div style={{ width: '17rem' }}>
          <div className="bg-primary flex flex-col items-center justify-center p-4 rounded-2xl">
            <div className="profile mx-auto rounded-full py-2 w-24">
              <img src={user.image} alt="profile" />
            </div>
            <div className="text-gray-800 text-2xl font-medium mt-4">
              <p>{user.username}</p>
            </div>
            <div className="text-gray-700 mt-4">
              <button
                className="bg-secondary py-2 px-4 hover:bg-primary text-primary hover:text-secondary 
                  w-full rounded-lg shadow-lg transition duration-700 ease-in-out"
                onClick={() => setIsHidden(false)}
              >
                Edit Profile
              </button>
            </div>
            <div className="w-full mt-8">
              <button
                className="bg-secondary py-2 px-4 hover:bg-primary text-primary hover:text-secondary 
                  w-full rounded-lg shadow-lg transition duration-700 ease-in-out"
                onClick={() => setIsAddImageHidden(false)}
              >
                Post Image
              </button>
            </div>
          </div>
        </div>
      </div>
      {user.username && (
        <EditUser user={user} isHidden={isHidden} setIsHidden={setIsHidden} />
      )}
    </>
  );
};

export default UserCard;
