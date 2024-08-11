const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000 || process.evn.PORT;

const allowedOrigins = ["http://localhost:5173"];

const corsOptionss = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE, HEAD",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  next();
});

app.use(cors(corsOptionss));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const editFileRouter = require("./Routes/editFile");
const removeFileRouter = require("./Routes/removeFile");

app.use("/editfile", editFileRouter);
app.use("/removefile", removeFileRouter);

app.listen(PORT, (req, res) => {
  console.log("Server is running at port " + PORT);
});
