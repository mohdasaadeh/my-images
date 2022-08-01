const LoadingBanner: React.FC = () => {
  return (
    <div className="bg-indigo-300">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <p className="ml-3 font-medium text-white">
              <span className="md:inline">Processing... Please wait!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBanner;
