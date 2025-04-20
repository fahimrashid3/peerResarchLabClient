import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollable = scrollHeight - clientHeight;

      if (scrolled > 300) {
        setIsVisible(true);
        setScrollProgress((scrolled / scrollable) * 100);
      } else {
        setIsVisible(false);
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const circumference = 2 * Math.PI * 20;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-5 right-5 cursor-pointer transition-opacity duration-300 z-50 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 25 25)"
          className="transition-all duration-300 text-primary-400 group-hover:text-primary-600"
        />
        {/* 3 Up Arrows */}
        <path
          d="M25 10L18 17L20 19L25 14L30 19L32 17L25 10Z"
          fill="currentColor"
          className="text-primary-400 group-hover:text-primary-600"
        />
        <path
          d="M25 17L18 24L20 26L25 21L30 26L32 24L25 17Z"
          fill="currentColor"
          className="text-primary-400 group-hover:text-primary-600"
        />
        <path
          d="M25 24L18 31L20 33L25 28L30 33L32 31L25 24Z"
          fill="currentColor"
          className="text-primary-400 group-hover:text-primary-600"
        />
      </svg>
    </div>
  );
};

export default ScrollToTop;
