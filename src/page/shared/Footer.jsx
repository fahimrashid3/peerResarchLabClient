import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import logoColoredPng from "../../assets/logo/logoColoredPng.png";
import logoWhitePng from "../../assets/logo/logoWhitePng.png";
import useInfo from "../../hooks/useInfo";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [info] = useInfo();

  return (
    <footer className="footer bg-primary-900 text-neutral-content p-10">
      <aside>
        <img src={logoWhitePng} alt="" />
        <p className="pl-2">Providing reliable tech since 2025</p>
      </aside>
      <nav>
        <div className="flex gap-5 pt-6">
          <Link to={"/"} className="footer-title">
            Home
          </Link>
          <Link to={"/publications"} className="footer-title">
            Publications
          </Link>
          <Link to={"/team"} className="footer-title">
            Team
          </Link>
          <Link to={"/contact"} className="footer-title">
            Contact Us
          </Link>
        </div>
        <div className="flex items-center gap-4 pt-2 pl-10">
          <a
            href={info?.socialMedia?.facebook || "#"}
            className="text-primary-500 hover:text-primary-700 text-3xl border-2 rounded-full p-2 border-primary-900 hover:border-primary-700"
            target="_blank"
          >
            <FaFacebookF />
          </a>
          <a
            href={info?.socialMedia?.linkedIn || "#"}
            className="text-primary-500 hover:text-primary-700 text-3xl border-2 rounded-full p-2 border-primary-900 hover:border-primary-700"
            target="_blank"
          >
            <FaLinkedinIn />
          </a>
          <a
            href={info?.socialMedia?.X || "#"}
            className="text-primary-500 hover:text-primary-700 text-3xl border-2 rounded-full p-2 border-primary-900 hover:border-primary-700"
            target="_blank"
          >
            <FaXTwitter />
          </a>
          <a
            href={info?.socialMedia?.whatsApp || "#"}
            className="text-primary-500 hover:text-primary-700 text-3xl border-2 rounded-full p-2 border-primary-900 hover:border-primary-700"
            target="_blank"
          >
            <FaWhatsapp />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
