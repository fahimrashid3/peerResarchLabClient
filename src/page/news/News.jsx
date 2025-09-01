import React from "react";
import useNews from "../../hooks/useNews";
import NewsCart from "./NewsCart";
import ScrollToTop from "../../components/ScrollToTop";
import Loading from "../../components/Loading";

const News = () => {
  // Use the useNews hook
  const [news = [], refetch, newsLoading] = useNews();

  // Show loading message while data is being fetched
  if (newsLoading) {
    return <Loading />;
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
    <div className="md:pt-24 max-w-7xl mx-auto">
      <div className="px-5 space-y-5">
        {news.map((singleNews) => (
          <NewsCart key={singleNews._id} singleNews={singleNews} />
        ))}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default News;
