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
      <div className="bg-black text-white flex items-center justify-between p-4">
        <div className="flex items-center">
          <img src={logo} alt="DocXify Logo" className="h-[11vh] w-[10vw]" />
          <p className="font-bold tracking-wide ml-4 text-3xl text-white">
            DocXify
          </p>
        </div>
        <div className="text-lg font-semibold">Downloads: {downloadCount}</div>
      </div>
      <div className="bg-gradient-to-r from-transparent via-gray-500 to-transparent w-full h-[1px]"></div>
    </>
  );
};

export default Header;
