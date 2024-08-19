import React, { useState, useEffect } from "react";
import logo from "../assets/DocXify.png";

const Header = () => {
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const response = await fetch(
          "https://doc-xify-7pzf.vercel.app/counter"
        );
        const data = await response.json();
        setDownloadCount(data.count);
      } catch (error) {
        console.error("Error fetching download counter:", error);
      }
    };

    fetchCounter();
  }, []);

  return (
    <>
      <div className="bg-black text-white flex items-center justify-between ">
        <div className="flex items-center">
          <img src={logo} alt="DocXify Logo" className="h-[15vh] w-[10vw] " />
          <div className=" mt-4">
            <p className="font-bold tracking-wide text-3xl text-blue-500">
              DocXify
            </p>
            <p className="font-bold tracking-wide text-white ">
              Get a simple front page in seconds.
            </p>
          </div>
        </div>
        <div className="text-lg font-semibold px-5 text-green-300 ">
          Downloads: {downloadCount}
        </div>
      </div>
      <div className="bg-gradient-to-r from-transparent via-gray-500 to-transparent w-full h-[1px]"></div>
    </>
  );
};

export default Header;
