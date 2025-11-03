import { Outlet } from "react-router-dom";
import Navbar from "../page/shared/navbar/Navbar";
import Footer from "../page/shared/Footer";

const Main = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-950 dark:text-white">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
