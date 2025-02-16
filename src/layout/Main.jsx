import { Outlet } from "react-router-dom";
import Navbar from "../page/shared/navbar/Navbar";
import Footer from "../page/shared/Footer";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
