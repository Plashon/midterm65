import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const NotuserLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default NotuserLayout;
