const Skeleton = () => {
  return (
    <div className="animate-pulse p-4 border-2 m-10 w-full h-full">
      <div className="h-6 bg-gray-300 w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 w-full"></div>
      <div className="h-4 bg-gray-300 w-2/3 mt-2"></div>
    </div>
  );
};

export default Skeleton;
