const AboutPageDesignRevers = ({ data }) => {
  const { image, name, details } = data;

  return (
    <div
      className="flex flex-col md:flex-row-reverse justify-around items-center md:max-w-[90%] lg:max-w-[85%]
     mx-auto gap-5 bg-white dark:bg-gray-900 p-5 rounded-lg md:rounded-xl"
    >
      <div className="w-full md:w-1/2 h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="w-full md:w-1/2 space-y-10 p-4">
        <p className="text-3xl font-bold text-primary-500">{name}</p>
        <p className="text-justify text-gray-800 dark:text-gray-100">
          {details}
        </p>
      </div>
    </div>
  );
};

export default AboutPageDesignRevers;
