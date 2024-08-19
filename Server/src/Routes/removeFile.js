const express = require("express");
const editDocx = require("../docHandle/docEdit");
const router = express.Router();
const docxConverter = require("docx-pdf");
const path = require("path");
const fs = require("fs");

router.post("/:id", async (req, res) => {
  const currentFile = req.params.id;
  console.log(currentFile);
  console.log(path.join("/tmp/", `${currentFile}.pdf`));
  const fileToDelete = path.join("/tmp/", `${currentFile}.pdf`);

  try {
    fs.unlinkSync(fileToDelete);
    console.log("pdf file deleted successfully");
    res.sendStatus(200);
  } catch (error) {
    console.log("error deleting pdf file when generating", error);
  }
});

module.exports = router;
