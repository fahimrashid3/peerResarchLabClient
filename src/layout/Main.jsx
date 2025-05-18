import { Outlet } from "react-router-dom";
import Navbar from "../page/shared/navbar/Navbar";
import Footer from "../page/shared/Footer";
import App from "../App";

const Main = () => {
  return (
    <div>
      <App />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
