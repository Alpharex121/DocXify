const fs = require("fs");
const pdfLib = require("pdf-lib");
const path = require("path");

const editPdfFrontPage = async ({
  collegeName,
  logoImage,
  subjectName,
  subjectCode,
  professorName,
  studentName,
  enrollmentNo,
  semester,
  branchName,
}) => {
  const newFileName = Math.floor(Math.random() * 1000000000000 + 1);
  const samplePath = path.join(__dirname, `sample.pdf`);
  const pdfPath = path.join(`/tmp/${newFileName}.pdf`);
  console.log(pdfPath);

  var binaryString = atob(logoImage);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const imageArray = bytes.buffer;

  try {
    const existingPdfBytes = fs.readFileSync(samplePath);
    const pdfDoc = await pdfLib.PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(
      pdfLib.StandardFonts.Helvetica
    );
    const HelveticaBold = await pdfDoc.embedFont(
      pdfLib.StandardFonts.HelveticaBold
    );

    const subjectWidth = HelveticaBold.widthOfTextAtSize(subjectName, 16);
    const subjectCodeWidth = HelveticaBold.widthOfTextAtSize(subjectCode, 16);

    const wrapText = (text, width, font, fontSize) => {
      const words = text.split(" ");
      let line = "";
      let result = "";
      let currHeight = 100;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);
        if (testWidth > width) {
          result += line + "\n";
          firstPage.drawText(line, {
            x:
              firstPage.getWidth() / 2 -
              HelveticaBold.widthOfTextAtSize(line, 24) / 2,
            y: height - currHeight,
            size: 24,

            font: HelveticaBold,
          });
          currHeight += 30;
          line = words[n] + " ";
        } else {
          line = testLine;
        }
      }
      result += line;
      firstPage.drawText(line, {
        x:
          firstPage.getWidth() / 2 -
          HelveticaBold.widthOfTextAtSize(line, 24) / 2,
        y: height - currHeight,
        size: 24,
        font: HelveticaBold,
      });
      return result;
    };

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    // Add college name centered at top (adjust Y position)
    wrapText(collegeName.toUpperCase(), 550, HelveticaBold, 24);

    // Add logo (adjust Y position)
    const pngImage = await pdfDoc.embedPng(imageArray);
    const pngDims = pngImage.scale(1);

    firstPage.drawImage(pngImage, {
      x: width / 2 - pngDims.width / 2,
      y: height - 200 - pngDims.height,
      width: pngDims.width,
      height: pngDims.height,
    });

    // Add subject name and code (adjust X and Y positions)
    firstPage.drawText(subjectName.toUpperCase(), {
      x: firstPage.getWidth() / 2 - subjectWidth / 2,
      y: height - 440,
      size: 16,
      font: HelveticaBold,
    });
    firstPage.drawText(subjectCode.toUpperCase(), {
      x: firstPage.getWidth() / 2 - subjectCodeWidth / 2,
      y: height - 465,
      size: 16,
      font: HelveticaBold,
    });

    // Add "Submitted To:-" and "Submitted by:-"
    firstPage.drawText("Submitted To:-", {
      x: 100,
      y: height - 530,
      size: 20,
      font: HelveticaBold,
    });
    firstPage.drawText("Submitted By:-", {
      x: width - 200,
      y: height - 530,
      size: 20,
      font: HelveticaBold,
    });

    // Add professor and student names
    firstPage.drawText(
      professorName.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      ),
      {
        x: 100,
        y: height - 555,
        size: 16,
        font: helveticaFont,
      }
    );
    firstPage.drawText(
      studentName.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      ),
      {
        x: width - 200,
        y: height - 555,
        size: 16,
        font: helveticaFont,
      }
    );

    // Add enrollment number, semester, and branch
    firstPage.drawText(enrollmentNo, {
      x: width - 200,
      y: height - 580,
      size: 16,
      font: helveticaFont,
    });
    firstPage.drawText(semester, {
      x: width - 200,
      y: height - 605,
      size: 16,
      font: helveticaFont,
    });
    firstPage.drawText(branchName.toUpperCase(), {
      x: width - 200,
      y: height - 630,
      size: 16,
      font: helveticaFont,
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(pdfPath, pdfBytes);
    console.log("PDF saved successfully:", pdfPath);
    return newFileName;
  } catch (error) {
    console.log("Error while generating PDF:", error);
  }
};

module.exports = editPdfFrontPage;
