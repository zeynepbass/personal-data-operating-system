export const FeedHeader = ({ title, description }) => {
  return (
    <div className="">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-600 mt-1">{description}</p>
    </div>
  );
};
