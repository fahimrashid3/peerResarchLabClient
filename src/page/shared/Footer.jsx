import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import logoColoredPng from "../../assets/logo/logoColoredPng.png";
import useInfo from "../../hooks/useInfo";
import { FiGithub } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const [info] = useInfo();

  return (
    <footer className="footer bg-primary-900 text-neutral-content p-10">
      <aside>
        <img src={logoColoredPng} alt="" />
        <p className="pl-2">
          Peer Research Lab
          <br />
          Providing reliable tech since 2025
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="flex items-center gap-4 pt-2">
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
