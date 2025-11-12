import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import logoColoredPng from "../../assets/logo/logoColoredPng.png";
import logoWhitePng from "../../assets/logo/logoWhitePng.png";
import useInfo from "../../hooks/useInfo";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [info] = useInfo();

  return (
    <footer className="footer w-full max-w-full bg-primary-900 text-neutral-content p-4 sm:p-6 md:p-8 lg:p-10 overflow-x-hidden box-border mx-0">
      <div className="w-full max-w-full flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-8">
        <aside className="w-full md:w-auto min-w-0 flex-shrink-0">
          <img
            src={logoWhitePng}
            alt=""
            className="w-28 sm:w-32 md:w-auto max-w-full h-auto"
          />
          <p className="pl-0 md:pl-2 text-xs md:text-base mt-2">
            Providing reliable tech since 2025
          </p>
        </aside>
        <nav className="w-full md:w-auto min-w-0 flex-shrink">
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-5 pt-2 md:pt-4">
            <Link
              to={"/"}
              className="footer-title text-xs md:text-base whitespace-nowrap"
            >
              Home
            </Link>
            <Link
              to={"/publications"}
              className="footer-title text-xs md:text-base whitespace-nowrap"
            >
              Publications
            </Link>
            <Link
              to={"/team"}
              className="footer-title text-xs md:text-base whitespace-nowrap"
            >
              Team
            </Link>
            <Link
              to={"/contact"}
              className="footer-title text-xs md:text-base whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 pt-3 md:pt-4 pl-0 flex-wrap">
            <a
              href={info?.socialMedia?.facebook || "#"}
              className="text-primary-500 hover:text-primary-700 text-xl sm:text-2xl md:text-3xl border-2 rounded-full p-1 sm:p-1.5 md:p-2 border-primary-900 hover:border-primary-700 flex-shrink-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href={info?.socialMedia?.linkedIn || "#"}
              className="text-primary-500 hover:text-primary-700 text-xl sm:text-2xl md:text-3xl border-2 rounded-full p-1 sm:p-1.5 md:p-2 border-primary-900 hover:border-primary-700 flex-shrink-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a
              href={info?.socialMedia?.X || "#"}
              className="text-primary-500 hover:text-primary-700 text-xl sm:text-2xl md:text-3xl border-2 rounded-full p-1 sm:p-1.5 md:p-2 border-primary-900 hover:border-primary-700 flex-shrink-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </a>
            <a
              href={info?.socialMedia?.whatsApp || "#"}
              className="text-primary-500 hover:text-primary-700 text-xl sm:text-2xl md:text-3xl border-2 rounded-full p-1 sm:p-1.5 md:p-2 border-primary-900 hover:border-primary-700 flex-shrink-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
