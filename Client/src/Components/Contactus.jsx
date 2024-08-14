// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

function ContactUs() {
  const [isOpen, setIsOpen] = useState(true);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  function sendMail(e) {
    e.preventDefault(); //This is important, i'm not sure why, but the email won't send without it

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID_CONTACT_US,
        e.target,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(
        (result) => {
          if (result.status == 200) {
            handleCloseModal();
            toast.success("Email sent successfully!", {
              theme: "colored",
            });
          }
        },
        (error) => {
          console.log(error);
          console.log(error.text);
        }
      );
  }
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/50 backdrop-blur-sm transition-all duration-300">
          <div className="relative w-1/2 rounded-lg bg-slate-900 p-6  shadow-lg  sm:p-8">
            <button
              className="absolute top-2 right-2 bg-transparent  border-none text-gray-700 text-3xl"
              onClick={handleCloseModal}
            >
              <span>&times;</span>
            </button>
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">
                  Contact Us
                </h2>
                <p className="text-gray-500  dark:text-gray-400">
                  Get in touch with our team for any inquiries or support.
                </p>
              </div>
              <div className="grid grid-cols-1  gap-4 sm:grid-cols-2">
                <div className="flex flex-col  items-start  space-y-2">
                  <img
                    className="h-3/4  "
                    src="https://blush.design/api/download?shareUri=Q2y4_D3RU18D6o1p&c=Hair_0%7E3164cf-0.1%7E150656_Rainbow_0%7E77cffb-0.1%7E008bf7_Skin_0%7E5e0606-0.1%7Eef9e89&w=800&h=800&fm=png"
                    alt=""
                  />
                  <h3 className="text-lg  mx-auto font-medium">Follow Us</h3>
                  <div className="flex items-center  mx-auto  space-x-4">
                    <a
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      href="https://www.instagram.com/anmol._7._/"
                      target="_blank"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <rect
                          width="20"
                          height="20"
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </a>
                    <a
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      href="https://discord.gg/SEAwwjNTjs"
                      target="_blank"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                      </svg>
                      <span className="sr-only">Discord</span>
                    </a>
                    
                  </div>
                </div>
                <form className="space-y-4" onSubmit={sendMail}>
                  <div className="space-y-1">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="flex h-10 w-full bg-slate-700  border-black rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="flex h-10 w-full bg-slate-700 placeholder:text-black  border-black rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="email"
                      placeholder="Enter your email"
                      name="email"
                      type="email"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      className="flex w-full rounded-md border placeholder:text-black  bg-slate-700  border-black border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                      id="message"
                      name="message"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  <button
                    className="inline-flex items-center bg-slate-700 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                    type="submit"
                    value="Send"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactUs;
