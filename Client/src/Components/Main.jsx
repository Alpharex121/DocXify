import React, { isValidElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUpload, FaTrash } from "react-icons/fa";
import { useActionState } from "react";
import axios from "axios";
import { Input } from "./ui/input";
import { BackgroundBeams } from "./ui/background-beams";
import { Cover } from "./ui/cover";
import { FileUpload } from "./ui/file-upload";
import { FollowerPointerCard } from "./ui/following-pointer";
import Footer from "./Footer";
import { ConfettiFireworks } from "./ui/confettiFireworks";
import Loader from "./Loader";
import Header from "./Header";
const FrontPageGenerator = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };

  const [preview, setPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [currentGenerate, setCurrentGenerate] = useState(null);
  const [pdfPath, setPDFPath] = useState("");
  const [pdfFile, setPDFFile] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [studName, setStudentName] = useState("");
  const logo = watch("logo"); // Watch the logo field
  const submitterByName = watch("studentName");

  const api = axios.create({
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });

  const handleBeforeUnload = (event) => {
    if (currentGenerate) handleRemoveFile();
    event.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  const image64String = async (e) => {
    let file = document.querySelector("input[type=file]")["files"][0];

    let reader = new FileReader();

    reader.onload = function () {
      let BaseString = reader.result.replace("data:", "").replace(/^.+,/, "");

      let imageBase64Stringsep = BaseString;

      const collegeName = e.collegeName;
      const subjectName = e.subjectName;
      const subjectCode = e.subjectCode;
      const logoImage = imageBase64Stringsep;
      const professorName = e.professorName;
      const branchName = e.branchName;
      const studentName = e.studentName;
      const semester = e.semester;
      const enrollmentNo = e.enrollmentNo;
      setStudentName(e.studentName);

      api
        .post("http://localhost:3000/editfile", {
          collegeName,
          subjectName,
          subjectCode,
          logoImage,
          branchName,
          professorName,
          studentName,
          semester,
          enrollmentNo,
        })
        .then((response) => {
          console.log("file edited successfully.");
          console.log(response);
          setCurrentGenerate(response.data);
          api
            .get("http://localhost:3000/editfile/" + response.data, {
              responseType: "blob",
            })
            .then((response) => {
              //Create a Blob from the PDF Stream
              const file = new Blob([response.data], {
                type: "application/pdf",
              });
              setPDFFile(file);
              //Build a URL from the file
              const fileURL = URL.createObjectURL(file);
              //Open the URL on new Window
              // window.open(fileURL);
              setPDFPath(fileURL);
              setIsSubmitting(false);
            })
            .catch((error) => {
              console.log(error);
            });
        });
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (e) => {
    if (logo && logo.length > 0) {
      // e.preventDefault();
      console.log("Generating new preview: ");
      setPreview(e);
      setLogoFile(logo[0]); // Store the first file (assuming single file upload)

      if (currentGenerate) {
        const currentFile = currentGenerate;
        api
          .post("http://localhost:3000/removefile/" + currentFile, {
            currentFile,
          })
          .then(() => {
            setCurrentGenerate(null);
            image64String(e);
          });
      } else {
        image64String(e);
      }
    }
  };

  const handleRemoveFile = async () => {
    setValue("logo");
    setPreview(null);
    // console.log(preview);
    if (currentGenerate) {
      const currentFile = currentGenerate;
      api
        .post("http://localhost:3000/removefile/" + currentFile, {
          currentFile,
        })
        .then(() => {
          setCurrentGenerate(null);
        })
        .catch((error) => {
          console.log("error occured while removing file");
        });
    }
    setLogoFile(null);
  };

  // const handleDownload = () => {
  //   if (pdfPath) {
  //     const url = URL.createObjectURL(pdfFile);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = studName;
  //     link.click();
  //     URL.revokeObjectURL(url); // Clean up the object URL
  //   }
  // };
  const handleDownload = async () => {
    if (pdfPath) {
      // Increment the counter on the server
      try {
        await api.post("http://localhost:3000/counter/increment"); // Update the endpoint if necessary

        const url = URL.createObjectURL(pdfFile);
        const link = document.createElement("a");
        link.href = url;
        link.download = studName;
        link.click();
        URL.revokeObjectURL(url); // Clean up the object URL
      } catch (error) {
        console.error("Error incrementing counter:", error);
      }
    }
  };

  return (
    <div>
      <Header />

      <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 p-8 bg-black text-white min-h-screen">
        {/* Form Section */}
        <div className="w-full  lg:w-1/2 bg-transparent p-8 cursor-none shadow-md rounded-lg border border-gray-200 z-10  overflow-hidden">
          <FollowerPointerCard>
            <h2 className="text-2xl font-semibold mb-6 text-white">
              Front Page Form
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {[
                { label: "College Name", name: "collegeName", type: "text" },
                { label: "Subject Name", name: "subjectName", type: "text" },
                { label: "Subject Code", name: "subjectCode", type: "text" },
                {
                  label: "Upload Logo",
                  name: "logo",
                  type: "file",
                  required: true,
                },
                {
                  label: "Professor Name",
                  name: "professorName",
                  type: "text",
                },
                { label: "Branch Name", name: "branchName", type: "text" },
                { label: "Student Name", name: "studentName", type: "text" },
                { label: "Semester", name: "semester", type: "text" },
                { label: "Enrollment No.", name: "enrollmentNo", type: "text" },
              ].map(({ label, name, type, required }) => (
                <div key={name} className="flex flex-col">
                  <label className="text-sm cursor-none font-medium text-white mb-2">
                    {label}
                  </label>
                  <Input
                    {...register(name, {
                      required: required ? "This field is required" : false,
                    })}
                    type={type}
                    className={`p-3  border border-gray-300 rounded-md shadow-sm bg-white focus:border-gray-500 cursor-none focus:ring-1 focus:ring-gray-500 transition ease-in-out duration-200 ${
                      type === "file"
                        ? "file:py-[0.4rem] file:px-4 file:border items-center file file:border-gray-300 cursor-none file:rounded-md file:text-sm file:bg-gray-500 file:my-[-20px]   "
                        : ""
                    }`}
                  />
                  {errors[name] && (
                    <span className="text-red-600 text-sm mt-1">
                      {errors[name].message}
                    </span>
                  )}
                  {type === "file" && logoFile && (
                    <button
                      type="button"
                      className="mt-2 flex items-center text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition ease-in-out duration-200"
                      onClick={() => {
                        setValue("logo", null);
                      }}
                    >
                      <FaTrash className="mr-2" /> Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className={`group/btn w-full text-white rounded-md h-10 font-medium ${
                  !logo ||
                  logo.length === 0 ||
                  !submitterByName ||
                  submitterByName.length == 0
                    ? "opacity-50 cursor-none"
                    : ""
                }`}
                disabled={
                  !logo ||
                  logo.length === 0 ||
                  !submitterByName ||
                  submitterByName.length == 0
                } // Disable the button if no logo is uploadedS
                onClick={() => {
                  window.scrollTo(0, 0);
                  setIsSubmitting(true);
                }}
              >
                <Cover>
                  <span className="text-neutral-700   dark:text-neutral-300 text-sm">
                    preview
                  </span>
                  <BottomGradient />
                </Cover>
              </button>
            </form>
          </FollowerPointerCard>
        </div>

        {/* Preview Section */}

        <div className="w-full lg:w-1/2 bg-transparent p-8 shadow-md rounded-lg border border-gray-200 z-20 overflow-hidden ">
          <h2 className="text-2xl font-semibold mb-3  text-white">Preview</h2>
          {isSubmitting ? (
            <Loader />
          ) : preview ? (
            <div className="h-[122vh] cursor-none ">
              <div className="  h-[100%] cursor-none">
                <iframe
                  src={pdfPath + "#toolbar=0&navpanes=0&scrollbar=0"}
                  height="100%"
                  width="100%"
                  type="application/pdf"
                  className="cursor-none"
                />
              </div>

              <div className="flex space-x-4 mt-5">
                <button
                  className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition ease-in-out duration-200"
                  onClick={handleDownload} // Trigger download when clicked
                >
                  <ConfettiFireworks />
                </button>
                <button
                  type="button"
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition ease-in-out duration-200"
                  onClick={handleRemoveFile}
                >
                  <FaTrash className="inline-block mr-2" /> Remove File
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-lg">
              No preview available. Fill out the form and click Preview.
            </p>
          )}
        </div>
      </div>
      <BackgroundBeams />
      <Footer />
    </div>
  );
};

export default FrontPageGenerator;
