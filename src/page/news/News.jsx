import React from "react";
import useNews from "../../hooks/useNews";
import NewsCart from "./NewsCart";

const News = () => {
  // Use the useNews hook
  const [news = [], refetch, newsLoading] = useNews();

  // Show loading message while data is being fetched
  if (newsLoading) {
    return <div className="text-center pt-20 text-xl">Loading News...</div>;
  }

  // Show a message if no news is found
  if (news.length === 0) {
    return (
      <div className="text-center pt-20 text-xl text-gray-500">
        No news found.
      </div>
    );
  }

  return (
    <div className="pt-16 max-w-7xl mx-auto border">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-6 mt-10">
        {/* Blog Section */}
        <div className="md:col-span-3 h-[80vh] overflow-y-auto min-h-screen px-5 space-y-5">
          {news.map((singleNews) => (
            <NewsCart key={singleNews._id} singleNews={singleNews} />
          ))}
        </div>

        {/* Additional Content Section */}
        <div className="md:col-span-1 h-[80vh] overflow-y-auto sticky top-16">
          <h1 className="font-semibold text-xl mb-2">Additional content</h1>
          <h1>We can show anything in this section</h1>
        </div>
      </div>
    </div>
  );
};

export default News;
