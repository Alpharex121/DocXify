/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ContactUs from "./Contactus";
import arpitProfile from "../assets/profile.jpg";
const Footer = () => {
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  const teamMembers = [
    {
      name: "Anmol awasthi",
      role: "Frontend Devloper",
      img: "https://avatars.githubusercontent.com/u/147149400?s=400&u=daad45eec9f0b95741706770c1a261f557cc375a&v=4", // Replace with actual image URL
      bio: "Building coding culture for the next generation.",
      social: {
        linkedin: "www.linkedin.com/in/anmol-awasthi11117",
        github: "https://github.com/Anmolawasthi117",
      },
    },
    {
      name: "Arpit Koshta",
      role: "Backend Devloper",
      img: arpitProfile, // Replace with actual image URL
      bio: "Crafting innovative solutions, one line of code at a time.",
      social: {
        linkedin: "https://www.linkedin.com/in/arpit-koshta/",
        github: "https://github.com/Alpharex121",
      },
    },
  ];

  return (
    <footer className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center  w-[98%]  ">
        <p className="text-sm font-bold tracking-wide">
          Made with love by the © DocXify. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <div className="text-sm hover:text-gray-300 focus:outline-none font-bold tracking-wide ">
            <button onClick={toggleContactForm}>Contact Us &nbsp; |</button>
          </div>
          {showContactForm && <ContactUs />}

          <button
            className="text-sm hover:text-gray-300 focus:outline-none font-bold tracking-wide"
            onClick={() => setAboutModalOpen(true)}
          >
            About Us
          </button>
        </div>
      </div>

      {/* Contact Us Modal */}

      {/* About Us Modal */}
      {isAboutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg  w-11/12 max-w-2xl text-center relative">
            <button
              className="absolute top-2 right-2 text-white focus:outline-none"
              onClick={() => setAboutModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-lg font-semibold mb-6">About Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-gray-900  p-6 rounded-lg shadow-lg text-left"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-contain"
                  />
                  <h3 className="text-md font-semibold text-center">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-400 text-center">
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {member.bio}
                  </p>
                  <div className="flex justify-center space-x-4 mt-4">
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2h-2v9H8V9h4v1a4 4 0 0 1 4-2zM2 9h4v12H2zM4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
                      </svg>
                    </a>
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .296c-6.63 0-12 5.373-12 12 0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577v-2.025c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.758-1.333-1.758-1.09-.745.083-.73.083-.73 1.204.085 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.304 3.492.997.108-.775.418-1.305.761-1.605-2.665-.303-5.466-1.335-5.466-5.931 0-1.31.467-2.381 1.236-3.221-.124-.303-.536-1.527.117-3.18 0 0 1.008-.322 3.3 1.23a11.488 11.488 0 0 1 6.006 0c2.292-1.553 3.298-1.23 3.298-1.23.653 1.653.242 2.877.118 3.18.77.84 1.235 1.911 1.235 3.221 0 4.607-2.803 5.625-5.475 5.92.43.372.814 1.107.814 2.234v3.317c0 .319.219.693.825.575C20.565 22.092 24 17.592 24 12.296c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
