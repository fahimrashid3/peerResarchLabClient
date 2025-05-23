import { useNavigate } from "react-router-dom";

const PendingPaperCard = ({ researchPaper }) => {
  const navigate = useNavigate();

  if (!researchPaper) {
    return <h1>Loading...</h1>;
  }

  const { title, image, details, _id } = researchPaper;

  const handleEditClick = () => {
    navigate(`/dashboard/editPaper/${_id}`, {
      state: { paper: researchPaper },
    });
  };

  return (
    <div className="flex items-center md:p-5 p-3 my-3 md:my-0 bg-dark-200 text-dark-900 dark:bg-dark-800 dark:text-white shadow-xl rounded-lg h-48 border border-dark-500">
      <figure className="flex-shrink-0 border-2 rounded-lg">
        <img
          className="h-36 w-32 rounded-lg object-cover"
          src={image}
          alt={title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://res.cloudinary.com/dipwayvsu/image/upload/v1745146763/uauic3zxcvxvdepwl3dk.webp";
          }}
        />
      </figure>
      <div className="ml-4 flex flex-col justify-center flex-1">
        <h2
          className="lg:text-xl md:text-lg font-bold line-clamp-1 text-justify"
          title={title}
        >
          {title}
        </h2>
        <p className="mt-2 text-sm line-clamp-3 text-justify">{details}</p>
        <button
          onClick={handleEditClick}
          className="mt-3 px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 w-fit"
        >
          Edit Paper
        </button>
      </div>
    </div>
  );
};

export default PendingPaperCard;
