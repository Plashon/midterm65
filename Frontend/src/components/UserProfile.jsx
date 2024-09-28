import React from "react";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext(); // ดึงฟังก์ชัน logout จาก context
  const handleLogout = () => {
    logout(); // เรียกใช้ฟังก์ชัน logout
    navigate("/"); // ใช้ navigate เพื่อเปลี่ยนเส้นทางไปที่หน้า Login
  };
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-50 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://gitlab.com/Plashon/mynft/-/raw/main/profile.png"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li>
          <a className="justify-between" href="userprofile">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li onClick={handleLogout}>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
