import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { VscFeedback } from "react-icons/vsc";

const PendingPaperCard = ({ researchPaper }) => {
  const navigate = useNavigate();

  if (!researchPaper) {
    return <h1>Loading...</h1>;
  }

  // Destructure with fallback values
  const {
    title = "Untitled Paper",
    image,
    details = "No details available.",
    _id,
    message,
  } = researchPaper;

  const handleEditClick = () => {
    if (_id) {
      navigate(`/dashboard/editPaper/${_id}`, {
        state: { paper: researchPaper },
      });
    } else {
      alert("Cannot edit this paper. Missing paper ID.");
    }
  };

  return (
    <div className="flex items-center md:p-5 p-3 my-3 md:my-0 bg-dark-200 text-dark-900 dark:bg-dark-800 dark:text-white shadow-xl rounded-lg h-48 border border-dark-500">
      <figure className="flex-shrink-0 border-2 rounded-lg">
        <img
          className="h-36 w-32 rounded-lg object-cover"
          src={image}
          alt={title}
          loading="lazy"
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
        <div className="md:flex md:gap-5">
          <p className="mt-2 text-sm line-clamp-3 text-justify">{details}</p>

          <div className="flex md:flex-col gap-5 pt-2">
            <button
              onClick={handleEditClick}
              className="btn w-16 text-xl border-b-4 font-semibold text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-100 hover:bg-primary-500 transition-all duration-200"
            >
              <FaEdit />
            </button>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {message ? (
              <button
                className="btn w-16 text-xl border-b-4 font-semibold text-primary-900 hover:text-white hover:border-primary-600 border-primary-700 bg-primary-100 hover:bg-primary-500 transition-all duration-200"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                <VscFeedback />
              </button>
            ) : (
              <></>
            )}
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Feedback</h3>
                <p className="py-4">{message}</p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingPaperCard;
