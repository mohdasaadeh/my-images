import ReactDOM from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useAuth } from '../hooks';
import { User } from '../redux';

type Inputs = {
  username: string;
  image: File[];
};

interface EditUserProps {
  user: User;
  isHidden: boolean;
  setIsHidden: Function;
}

const EditUser: React.FC<EditUserProps> = ({ user, isHidden, setIsHidden }) => {
  const { editUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: user.username,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = new FormData();

    formData.append('username', data.username);
    if (data.image[0]) formData.append('image', data.image[0]);

    editUser(user, formData, setIsHidden);
  };

  return ReactDOM.createPortal(
    <div
      className={`${
        isHidden && 'hidden'
      } treact-popup fixed inset-0 flex items-center justify-center bg-info-background`}
    >
      <div className="max-w-lg p-8 sm:pb-4 bg-white rounded shadow-lg text-center sm:text-left">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6 justify-center flex flex-col sm:flex-row items-center">
          Edit Profile
        </h3>
        <div>
          <form
            className="flex flex-col items-center space-x-6"
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Username
              </div>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-info-dark"
                placeholder="Username"
                {...register('username', { required: true })}
              />
              {errors.username && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="w-full">
              <label className="block mt-4">
                <input
                  type="file"
                  className="block w-full text-sm text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-info-light file:text-primary hover:file:text-secondary hover:file:bg-info-background file:transition file:duration-700 ease-in-out"
                  {...register('image')}
                />
              </label>
            </div>
            <div className="mt-8 pt-8 sm:pt-4 border-t -mx-8 px-8 flex flex-col sm:flex-row justify-end leading-relaxed">
              <button
                type="submit"
                className="mx-4 px-6 py-2 text-white rounded-full bg-secondary hover:bg-primary hover:text-secondary focus:outline-none transition duration-700 ease-in-out border border-slate-400 border-secondary mt-2"
              >
                Edit
              </button>
              <button
                type="button"
                className="mx-4 px-6 py-2 text-secondary rounded-full bg-primary hover:bg-secondary mr-2 hover:text-primary focus:outline-none transition duration-700 ease-in-out border border-slate-400 border-secondary mt-2"
                onClick={() => setIsHidden(true)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById('modal')!,
  );
};

export default EditUser;
