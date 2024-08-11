import React from "react";
import logo from "../assets/DocXify.png";

const Header = () => {
  return (
    <>
      <div className="bg-black text-white flex items-center">
        <img src={logo} alt="" className="h-[13vh] w-[10vw]" />
        <p className="font-bold tracking-wide mt-4 text-3xl text-white">
          DocXify
        </p>
      </div>
      <div className="bg-gradient-to-r from-transparent via-gray-500 to-transparent w-full  h-[1px]"></div>
    </>
  );
};

export default Header;
