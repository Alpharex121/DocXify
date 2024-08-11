import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FrontPageGenerator from "./Components/Main";
import axios from "axios";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <FrontPageGenerator />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
