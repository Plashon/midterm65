import { useState, useEffect } from "react";
import Header from "./Header";
import UserProfile from "./UserProfile";
import RegisterButton from "./RegisterButton";
import LoginButton from "./LoginButton";
import { useAuthContext } from "../context/authContext";



function Navbar() {
  const { user } = useAuthContext();
  const menus = {
    ROLES_ADMIN: [
      { name: "Home page", link: "/" },
      { name: "Add New book", link: "/add" },
    ],
    ROLES_USER: [{ name: "Home page", link: "/" }],
  };
  return (
    <div className="navbar bg-base-100 mt-5 mb-10 mx-auto h-30 w-5/6">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
           {user &&
              menus[user.roles[0]].map((menuItem) => (//แอร์โรว์ที่มาจาก .map ไม่ต้องใช้ปีกกา
                <li key={menuItem.name}>
                  <a href={menuItem.link}> {menuItem.name}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="navbar-center h-10">
        <div className="btn btn-ghost text-xl align-middle h-24">
          <Header />
        </div>
      </div>
      <div className="navbar-end space-x-2">
      {user && (
          <div className=" text-xl">
            Welcome,
            <span className=" text-blue-700">
              {user.userName}
              {""}
              {user.roles.map((role, index) => {
                return (
                  <div key={index} className=" text-xs">
                    <span className="  badge-accent badge-outline">{role}</span>
                  </div>
                );
              })}
            </span>
          </div>
        )}

        {user ? (
          <UserProfile />
        ) : (
          <div className="space-x-2">
            <RegisterButton />
            <LoginButton />
          </div>
        )}
        <label className="grid cursor-pointer place-items-center">
          <input
            type="checkbox"
            value="synthwave"
            className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
              />
          <svg
            className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
    </div>
  );
}

export default Navbar;
