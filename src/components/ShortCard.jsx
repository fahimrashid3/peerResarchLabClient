import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ShortCard = ({ researchPaper }) => {
  if (!researchPaper) {
    return <h1>loading</h1>;
  }

  return (
    <div className="flex items-center m-5 bg-dark-200 text-dark-900 dark:bg-dark-800 dark:text-white shadow-xl rounded-lg h-48">
      {/* Fixed height */}
      <figure className="flex-shrink-0">
        <img
          className="h-36 w-32 rounded-lg object-cover" // Fixed size and object-cover
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          alt="Movie"
        />
      </figure>
      <div className="ml-4 flex flex-col justify-center">
        <h2 className="lg:text-xl text-lg font-bold line-clamp-2">
          {researchPaper.title}
        </h2>
        <p className="mt-2 text-sm line-clamp-3">{researchPaper.details}</p>
        <div className="flex items-center gap-3 mt-2">
          <Rating
            style={{ maxWidth: 100 }}
            value={researchPaper.rating}
            readOnly
          />
          <p>({researchPaper.totalRating})</p>
        </div>
      </div>
    </div>
  );
};

export default ShortCard;
