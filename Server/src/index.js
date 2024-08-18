const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000 || process.evn.PORT;

const allowedOrigins = ["https://doc-xify.vercel.app"];

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

// let counter = 1000;
app.use(cors(corsOptionss));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const editFileRouter = require("./Routes/editFile");
const removeFileRouter = require("./Routes/removeFile");
const counterRouter = require("./Routes/counter");

app.use("/editfile", editFileRouter);
app.use("/removefile", removeFileRouter);
app.use("/counter", counterRouter);
// app.get('/counter', (req, res) => {
//   res.json({ count: counter });  // This should return the current counter value as JSON
// });

app.listen(PORT, (req, res) => {
  console.log("Server is running at port " + PORT);
});
