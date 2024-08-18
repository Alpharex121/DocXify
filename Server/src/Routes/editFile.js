"use strict";
const express = require("express");
const editDocx = require("../docHandle/docEdit");
const router = express.Router();
const docxConverter = require("docx-pdf");
const converFile = require("convert-multiple-files");
const FileforgeClient = require("@fileforge/client");
const pdfLIb = require("pdf-lib");
const fs = require("fs");
const path = require("path");

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
    console.log(newFileName);

    res.send(`${newFileName}`);
  });
});
router.get("/:id", async (req, res) => {
  const newFileName = req.params.id;
  const dirName = __dirname.slice(0, -6) + "docHandle\\";
  const pdfPath = dirName + newFileName + ".pdf";
  res.sendFile(pdfPath);
});

module.exports = router;
