import React from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const ShortCard = ({ researchPaper }) => {
  if (!researchPaper) {
    return <h1>loading</h1>;
  }
  console.log(researchPaper);
  return (
    <div className="card card-side bg-dark-200 text-dark-900 dark:bg-dark-800 dark:text-white shadow-xl">
      <figure>
        <img
          className=" h-32 w-32 rounded-lg"
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          alt="Movie"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{researchPaper.title}</h2>
        <p>{researchPaper.details}</p>
        {/* <p>{researchPaper.rating}</p> */}
        <div className="flex gap-3">
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
