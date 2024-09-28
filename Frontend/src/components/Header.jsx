import React from "react";

function Header() {
  return (
    <div className="container flex flex-col items-center mx-auto space-y-4 mb-5">
      <div className="font-bold text-4xl text-center mt-5">
        <a href="http://localhost:5173/">
          <span className="text-blue-700">Book</span> Bookshelf
        </a>
      </div>
    </div>
  );
}

export default Header;
