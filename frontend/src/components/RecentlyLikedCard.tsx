const RecentlyLikedCard: React.FC = () => {
  return (
    <div className="flex flex-col justify-between">
      <div style={{ width: '17rem' }}>
        <div className="bg-primary mt-10 flex flex-col items-center justify-center p-4 rounded-2xl">
          <div className="mx-auto rounded-full py-2 w-24">
            <h1>Recent Activities</h1>
          </div>

          <div className="flex mt-2 items-center justify-between bg-white p-6 rounded-xl">
            <img src="./img/avatar-shanai.png" className="w-8 mr-2" />
            <p className="text-sm">You liked this image</p>
          </div>

          <div className="w-full mt-8">
            <button
              className="bg-secondary py-2 px-4 hover:bg-primary text-primary hover:text-secondary
                   w-full rounded-lg shadow-lg transition duration-700 ease-in-out"
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyLikedCard;
