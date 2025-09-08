import React from "react";
import { Helmet } from "react-helmet";
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
      <Helmet>
        <title>News & Updates - Peer Research Lab</title>
        <meta
          name="description"
          content="Stay updated with the latest news, announcements, and updates from Peer Research Lab. Discover recent research breakthroughs, events, and important information."
        />
        <meta
          name="keywords"
          content="research news, academic updates, research lab news, scientific announcements, research breakthroughs, peer research lab updates"
        />
        <meta
          property="og:title"
          content="News & Updates - Peer Research Lab"
        />
        <meta
          property="og:description"
          content="Stay updated with the latest news, announcements, and updates from Peer Research Lab. Discover recent research breakthroughs, events, and important information."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="News & Updates - Peer Research Lab"
        />
        <meta
          name="twitter:description"
          content="Stay updated with the latest news, announcements, and updates from Peer Research Lab. Discover recent research breakthroughs, events, and important information."
        />
      </Helmet>
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
