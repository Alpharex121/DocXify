const express = require("express");
const editDocx = require("../docHandle/docEdit");
const router = express.Router();
const docxConverter = require("docx-pdf");
const fs = require("fs");

router.post("/", async (req, res) => {
  const collegeName = req.body.collegeName;
  const subjectName = req.body.subjectName;
  const subjectCode = req.body.subjectCode;
  const logo = req.body.logoImage;
  const professorName = req.body.professorName;
  const branchName = req.body.branchName;
  const studentName = req.body.studentName;
  const semester = req.body.semester;
  const enrollmentNo = req.body.enrollmentNo;

  editDocx({
    collegeName: collegeName,
    subjectName: subjectName,
    subjectCode: subjectCode,
    professorName: professorName,
    studentName: studentName,
    branchName: branchName,
    semester: semester,
    enrollmentNo: enrollmentNo,
    logoImage: logo,
  }).then((newFileName) => {
    // const pdfPath = __dirname + "/" + +newFileName + ".pdf";
    // var data = fs.readFileSync(result);
    // res.contentType("application/pdf");
    // res.send(data);
    const dirName = __dirname.slice(0, -6) + "docHandle/";
    const docxPath = dirName + newFileName + ".docx";
    const pdfPath = dirName + newFileName + ".pdf";
    console.log(newFileName);

    docxConverter(docxPath, pdfPath, (err, result) => {
      if (err) console.log(err);
      else console.log(result); // writes to file for us
      const fileToDelete =
        __dirname.slice(0, -6) + "docHandle\\" + newFileName + ".docx";
      try {
        fs.unlinkSync(fileToDelete);
        console.log("docx file deleted successfully");
      } catch (error) {
        console.log("error deleting docx file when generating", error);
      }

      res.send(`${newFileName}`);
    });
  });
});

router.get("/:id", async (req, res) => {
  const newFileName = req.params.id;
  const dirName = __dirname.slice(0, -6) + "docHandle\\";
  const pdfPath = dirName + newFileName + ".pdf";
  res.sendFile(pdfPath);
});

module.exports = router;
