import { Outlet } from "react-router-dom";
import Navbar from "../page/shared/navbar/Navbar";
import Footer from "../page/shared/Footer";

const Main = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-950 dark:text-white overflow-x-hidden w-full max-w-full">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
